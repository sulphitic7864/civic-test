const QUESTION_SECONDS = 60;
const DEFAULT_TOTAL_QUESTIONS = 100;
const OPTION_KEYS = ["a", "b", "c", "d"];

const elements = {
  statusPanel: document.getElementById("status-panel"),
  scoreText: document.getElementById("score-text"),
  progressText: document.getElementById("progress-text"),
  progressFill: document.getElementById("progress-fill"),
  totalTimer: document.getElementById("total-timer"),
  eyebrowText: document.querySelector(".eyebrow"),
  introText: document.querySelector(".intro"),
  setupScreen: document.getElementById("setup-screen"),
  quizScreen: document.getElementById("quiz-screen"),
  resultScreen: document.getElementById("result-screen"),
  studentName: document.getElementById("student-name"),
  setupMessage: document.getElementById("setup-message"),
  questionText: document.getElementById("question-text"),
  optionsContainer: document.getElementById("options-container"),
  feedback: document.getElementById("feedback"),
  nextButton: document.getElementById("next-button"),
  quitButton: document.getElementById("quit-button"),
  submitButton: document.getElementById("submit-button"),
  startButton: document.getElementById("start-button"),
  restartButton: document.getElementById("restart-button"),
  reviewButton: document.getElementById("review-button"),
  downloadButton: document.getElementById("download-button"),
  resultSummary: document.getElementById("result-summary")
};

const state = {
  allQuestions: [],
  quizQuestions: [],
  missedQuestions: [],
  currentIndex: 0,
  score: 0,
  questionTimeLimit: QUESTION_SECONDS,
  questionTimeRemaining: QUESTION_SECONDS,
  answeredCurrentQuestion: false,
  studentName: "",
  quizMode: "all",
  reviewMode: false,
  timerId: null,
  quizComplete: false,
  resultData: null
};

document.addEventListener("DOMContentLoaded", async () => {
  showScreen("setup");
  await loadQuestions();
  bindEvents();
  resetToSetup();
  updateSetupMessage("Choose a mode and start when you are ready.");
});

window.addEventListener("pageshow", () => {
  resetToSetup();
});

async function loadQuestions() {
  try {
    const response = await fetch("questions.json");
    if (!response.ok) {
      throw new Error("Question data could not be loaded.");
    }

    state.allQuestions = await response.json();
  } catch (error) {
    updateSetupMessage("The question file could not be loaded. Please refresh and try again.");
    elements.startButton.disabled = true;
  }
}

function bindEvents() {
  elements.startButton.addEventListener("click", () => startQuiz({ reviewQuestions: null }));
  elements.nextButton.addEventListener("click", handlePrimaryAction);
  elements.quitButton.addEventListener("click", confirmQuitQuiz);
  elements.submitButton.addEventListener("click", () => finishQuiz("submitted"));
  elements.restartButton.addEventListener("click", resetToSetup);
  elements.reviewButton.addEventListener("click", startReviewSession);
  elements.downloadButton.addEventListener("click", downloadResultCsv);
}

function startQuiz({ reviewQuestions }) {
  if (!state.allQuestions.length && !reviewQuestions) {
    updateSetupMessage("Questions are still loading.");
    return;
  }

  const studentName = elements.studentName.value.trim();
  if (!studentName) {
    updateSetupMessage("Please enter the student name before starting.");
    elements.studentName.focus();
    return;
  }

  const selectedMode = reviewQuestions ? "review" : getSelectedMode();
  const sourceQuestions = reviewQuestions || getQuestionsForMode(selectedMode);

  if (!sourceQuestions.length) {
    updateSetupMessage("No questions are available for that mode.");
    return;
  }

  state.studentName = studentName;
  state.quizMode = selectedMode;
  state.reviewMode = Boolean(reviewQuestions);
  state.quizQuestions = buildQuizQuestions(sourceQuestions);
  state.currentIndex = 0;
  state.score = 0;
  state.questionTimeLimit = QUESTION_SECONDS;
  state.questionTimeRemaining = QUESTION_SECONDS;
  state.answeredCurrentQuestion = false;
  state.quizComplete = false;
  state.resultData = null;
  if (!state.reviewMode) {
    state.missedQuestions = [];
  }

  updateHeaderForMode();
  clearTimer();
  startTimer();
  showScreen("quiz");
  renderQuestion();
}

function getSelectedMode() {
  const selected = document.querySelector('input[name="quiz-mode"]:checked');
  return selected ? selected.value : "all";
}

function getQuestionsForMode(mode) {
  return [...state.allQuestions];
}

function getScoreTotal() {
  return state.quizQuestions.length || getSetupQuestionTotal();
}

function getSetupQuestionTotal() {
  return state.allQuestions.length || DEFAULT_TOTAL_QUESTIONS;
}

function shuffleQuestions(items) {
  const copy = [...items];

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const swapIndex = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[swapIndex]] = [copy[swapIndex], copy[i]];
  }

  return copy;
}

function buildQuizQuestions(sourceQuestions) {
  return shuffleQuestions(sourceQuestions).map((question) => {
    const shuffledOptions = shuffleQuestions(
      question.options.map((option) => ({ ...option, originalKey: option.key }))
    ).map((option, index) => ({
      key: OPTION_KEYS[index],
      text: option.text,
      originalKey: option.originalKey
    }));

    const correctOption = shuffledOptions.find((option) => option.originalKey === question.correctAnswer);

    return {
      ...question,
      options: shuffledOptions.map(({ key, text }) => ({ key, text })),
      correctAnswer: correctOption ? correctOption.key : question.correctAnswer
    };
  });
}

function startTimer() {
  updateTimerText();
  state.timerId = window.setInterval(() => {
    state.questionTimeRemaining = Math.max(state.questionTimeRemaining - 1, 0);

    if (state.questionTimeRemaining <= 0 && !state.answeredCurrentQuestion) {
      state.questionTimeRemaining = 0;
      updateTimerText();
      handleQuestionTimeout();
      return;
    }

    updateTimerText();
  }, 1000);
}

function clearTimer() {
  if (state.timerId) {
    window.clearInterval(state.timerId);
    state.timerId = null;
  }
}

function renderQuestion() {
  const currentQuestion = state.quizQuestions[state.currentIndex];
  const totalQuestions = state.quizQuestions.length;
  const isLastQuestion = state.currentIndex === totalQuestions - 1;

  state.answeredCurrentQuestion = false;
  state.questionTimeLimit = QUESTION_SECONDS;
  state.questionTimeRemaining = QUESTION_SECONDS;

  elements.questionText.textContent = currentQuestion.question;
  elements.optionsContainer.innerHTML = "";
  elements.feedback.className = "feedback hidden";
  elements.feedback.hidden = true;
  elements.feedback.textContent = "";
  elements.nextButton.classList.remove("hidden");
  elements.nextButton.hidden = false;
  elements.nextButton.disabled = true;
  elements.nextButton.textContent = isLastQuestion ? "Submit Test" : "Next question";
  elements.quitButton.hidden = false;
  elements.quitButton.disabled = false;
  elements.submitButton.classList.add("hidden");
  elements.submitButton.hidden = true;
  elements.submitButton.disabled = true;

  currentQuestion.options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-button";
    button.innerHTML = `<strong>${option.key.toUpperCase()}.</strong> ${option.text}`;
    button.addEventListener("click", () => selectAnswer(option.key));
    elements.optionsContainer.appendChild(button);
  });

  updateStatus();
}

function selectAnswer(selectedKey) {
  if (state.answeredCurrentQuestion || state.quizComplete) {
    return;
  }

  state.answeredCurrentQuestion = true;
  const currentQuestion = state.quizQuestions[state.currentIndex];
  const isCorrect = selectedKey === currentQuestion.correctAnswer;
  const optionButtons = elements.optionsContainer.querySelectorAll(".option-button");

  optionButtons.forEach((button, index) => {
    const option = currentQuestion.options[index];
    button.disabled = true;

    if (option.key === currentQuestion.correctAnswer) {
      button.classList.add("correct");
    } else if (option.key === selectedKey && !isCorrect) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    state.score += 1;
    showFeedback("Correct!", "correct");
  } else {
    const correctOption = currentQuestion.options.find((option) => option.key === currentQuestion.correctAnswer);
    showFeedback(`Incorrect. Correct answer: ${correctOption.text}`, "incorrect");

    if (!state.reviewMode) {
      state.missedQuestions.push(currentQuestion);
    }
  }

  updateStatus();
  elements.nextButton.disabled = false;
  elements.nextButton.textContent = state.currentIndex === state.quizQuestions.length - 1
    ? "Submit Test"
    : "Next question";
}

function handleQuestionTimeout() {
  if (state.answeredCurrentQuestion || state.quizComplete) {
    return;
  }

  state.answeredCurrentQuestion = true;

  const currentQuestion = state.quizQuestions[state.currentIndex];
  const correctOption = currentQuestion.options.find((option) => option.key === currentQuestion.correctAnswer);
  const optionButtons = elements.optionsContainer.querySelectorAll(".option-button");

  optionButtons.forEach((button, index) => {
    const option = currentQuestion.options[index];
    button.disabled = true;

    if (option.key === currentQuestion.correctAnswer) {
      button.classList.add("correct");
    }
  });

  if (!state.reviewMode) {
    state.missedQuestions.push(currentQuestion);
  }

  showFeedback(`Time is up for this question. Correct answer: ${correctOption.text}`, "incorrect");
  updateStatus();
  elements.nextButton.disabled = false;
  elements.nextButton.textContent = state.currentIndex === state.quizQuestions.length - 1
    ? "Submit Test"
    : "Next question";
}

function handlePrimaryAction() {
  if (!state.answeredCurrentQuestion) {
    return;
  }

  const isLastQuestion = state.currentIndex === state.quizQuestions.length - 1;
  if (isLastQuestion) {
    finishQuiz("submitted");
    return;
  }

  goToNextQuestion();
}

function showFeedback(message, tone) {
  elements.feedback.textContent = message;
  elements.feedback.className = `feedback ${tone}`;
  elements.feedback.hidden = false;
}

function goToNextQuestion() {
  state.currentIndex += 1;
  renderQuestion();
}

function confirmQuitQuiz() {
  if (state.quizComplete || !state.quizQuestions.length) {
    resetToSetup();
    return;
  }

  const shouldQuit = window.confirm("Are you sure you want to quit this test? Your current progress will be lost.");
  if (shouldQuit) {
    resetToSetup();
  }
}

function updateStatus() {
  const totalQuestions = state.quizQuestions.length;
  const currentNumber = totalQuestions ? state.currentIndex + 1 : 0;
  const progressPercentage = totalQuestions ? (currentNumber / totalQuestions) * 100 : 0;

  elements.scoreText.textContent = `${state.score} out of ${getScoreTotal()} correct`;
  elements.progressText.textContent = `Question ${currentNumber} of ${totalQuestions}`;
  elements.progressFill.style.width = `${progressPercentage}%`;
  updateTimerText();
}

function updateTimerText() {
  elements.totalTimer.textContent = `Time left: ${formatTime(state.questionTimeRemaining)}`;
}

function formatTime(totalSeconds) {
  const safeSeconds = Math.max(totalSeconds, 0);
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function finishQuiz(reason) {
  if (state.quizComplete || !state.quizQuestions.length) {
    return;
  }

  state.quizComplete = true;
  clearTimer();

  const completedAt = new Date();
  const totalQuestions = state.quizQuestions.length;
  const correctAnswers = state.score;
  const incorrectAnswers = totalQuestions - correctAnswers;
  const percentage = totalQuestions ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
  const date = completedAt.toLocaleDateString("en-CA");
  const time = completedAt.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

  state.resultData = {
    studentName: state.studentName,
    totalQuestions,
    correctAnswers,
    incorrectAnswers,
    percentageScore: `${percentage}%`,
    date,
    time
  };

  renderResult(reason);
  showScreen("result");
}

function renderResult(reason) {
  const reasonText = reason === "time"
    ? "Time ran out and the quiz was submitted automatically."
    : "The quiz has been submitted.";

  elements.resultSummary.innerHTML = [
    `<p><strong>${reasonText}</strong></p>`,
    `<p><strong>Student:</strong> ${escapeHtml(state.resultData.studentName)}</p>`,
    `<p><strong>Mode:</strong> ${formatModeLabel(state.quizMode)}</p>`,
    `<p><strong>Total questions:</strong> ${state.resultData.totalQuestions}</p>`,
    `<p><strong>Correct answers:</strong> ${state.resultData.correctAnswers}</p>`,
    `<p><strong>Incorrect answers:</strong> ${state.resultData.incorrectAnswers}</p>`,
    `<p><strong>Percentage score:</strong> ${state.resultData.percentageScore}</p>`,
    `<p><strong>Date:</strong> ${state.resultData.date}</p>`,
    `<p><strong>Time:</strong> ${state.resultData.time}</p>`
  ].join("");

  const shouldShowReview = !state.reviewMode && state.missedQuestions.length > 0;
  elements.reviewButton.classList.toggle("hidden", !shouldShowReview);
  elements.reviewButton.hidden = !shouldShowReview;
}

function formatModeLabel(mode) {
  if (mode === "hard") {
    return "Hard-question practice mode";
  }

  if (mode === "review") {
    return "Missed-question review";
  }

  return "All questions";
}

function updateHeaderForMode() {
  if (state.quizMode === "hard") {
    elements.eyebrowText.textContent = "US Naturalization Practice - Hard Mode";
    elements.introText.textContent = "Practice all 100 civics questions in hard mode with a strict 1-minute timer for each question.";
    return;
  }

  if (state.quizMode === "review") {
    elements.eyebrowText.textContent = "US Naturalization Practice - Review Mode";
    elements.introText.textContent = "Review the questions missed in your previous attempt, one at a time.";
    return;
  }

  elements.eyebrowText.textContent = "US Naturalization Practice";
  elements.introText.textContent = "Practice the 100 official civics questions one at a time with instant feedback.";
}

function startReviewSession() {
  startQuiz({ reviewQuestions: state.missedQuestions });
}

function downloadResultCsv() {
  if (!state.resultData) {
    return;
  }

  const headers = "student_name,total_questions,correct_answers,incorrect_answers,percentage_score,date,time";
  const row = [
    state.resultData.studentName,
    state.resultData.totalQuestions,
    state.resultData.correctAnswers,
    state.resultData.incorrectAnswers,
    state.resultData.percentageScore,
    state.resultData.date,
    state.resultData.time
  ].map(escapeCsvValue).join(",");
  const blob = new Blob([`${headers}\n${row}\n`], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = createFileName();
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function createFileName() {
  const safeName = state.resultData.studentName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `${safeName || "student"}-civics-result.csv`;
}

function escapeCsvValue(value) {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function showScreen(screen) {
  const showSetup = screen === "setup";
  const showQuiz = screen === "quiz";
  const showResult = screen === "result";
  const showStatus = !showSetup;

  elements.setupScreen.classList.toggle("hidden", !showSetup);
  elements.setupScreen.hidden = !showSetup;
  elements.setupScreen.setAttribute("aria-hidden", String(!showSetup));
  elements.quizScreen.classList.toggle("hidden", !showQuiz);
  elements.quizScreen.hidden = !showQuiz;
  elements.quizScreen.setAttribute("aria-hidden", String(!showQuiz));
  elements.resultScreen.classList.toggle("hidden", !showResult);
  elements.resultScreen.hidden = !showResult;
  elements.resultScreen.setAttribute("aria-hidden", String(!showResult));
  elements.statusPanel.classList.toggle("hidden", !showStatus);
  elements.statusPanel.hidden = !showStatus;
  elements.statusPanel.setAttribute("aria-hidden", String(!showStatus));
}

function resetToSetup() {
  clearTimer();
  state.quizQuestions = [];
  state.currentIndex = 0;
  state.score = 0;
  state.questionTimeLimit = QUESTION_SECONDS;
  state.questionTimeRemaining = QUESTION_SECONDS;
  state.answeredCurrentQuestion = false;
  state.reviewMode = false;
  state.quizComplete = false;
  state.resultData = null;
  elements.resultSummary.innerHTML = "";
  elements.feedback.textContent = "";
  elements.feedback.className = "feedback hidden";
  elements.feedback.hidden = true;
  elements.nextButton.classList.add("hidden");
  elements.nextButton.hidden = true;
  elements.nextButton.disabled = true;
  elements.nextButton.textContent = "Next question";
  elements.quitButton.hidden = true;
  elements.quitButton.disabled = true;
  elements.submitButton.classList.add("hidden");
  elements.submitButton.hidden = true;
  elements.reviewButton.classList.add("hidden");
  elements.reviewButton.hidden = true;
  elements.scoreText.textContent = `0 out of ${getSetupQuestionTotal()} correct`;
  elements.progressText.textContent = `Question 0 of ${getSetupQuestionTotal()}`;
  elements.progressFill.style.width = "0%";
  elements.totalTimer.textContent = `Time left: ${formatTime(QUESTION_SECONDS)}`;
  updateHeaderForMode();
  updateSetupMessage("Choose a mode and start when you are ready.");
  showScreen("setup");
}

function updateSetupMessage(message) {
  elements.setupMessage.textContent = message;
}




