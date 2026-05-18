# Civics Prep Quiz Web Page - Detailed Development Brief

---

# Project Information

| Field | Details |
|---|---|
| Category | Web Development |
| Project Type | One Page Static Quiz Website |
| Company Name | Civics Prep |
| Website Type | Civics quiz practice page |
| Final Format | Static HTML, CSS, vanilla JavaScript, local JSON data, Dockerfile |
| Primary Goal | Create a simple mobile-friendly civics quiz page for US naturalization test practice with local result CSV download |

---

# Project Overview

The goal of this project is to build a simple one page civics quiz website for Civics Prep.

Civics Prep is a small civics tutoring service that helps immigrants prepare for the US naturalization test.

The quiz page should make practice easier for students who currently receive PDF materials by email.

The website must allow students to:

- Practice official civics questions
- View one question at a time
- Choose one answer from four options
- See the correct answer after choosing
- Track their score while practicing
- View the final result after the quiz ends
- Download their result as a CSV file on localhost
- Use the page easily on mobile phones

The design should be simple, clean, and easy to read.

The project must not include:

- React
- Complex frontend frameworks
- Backend development
- Login system
- Payment setup
- Database
- Admin panel
- Advanced design system
- Server-side processing
- Namecheap setup
- FTP upload process
- Live domain deployment

The final website must run locally on localhost and through Docker.

A working Dockerfile is required.

---

# About Civics Prep

Civics Prep is a small tutoring service focused on helping immigrants prepare for the US naturalization test.

The tutor needs a simple quiz practice page that students can use on phones and desktops.

The project should focus on usability, clear question display, simple answer selection, score tracking, final result display, and CSV result download.

The visual style should remain plain and professional.

---

# Provided Assets

The following assets are provided for the project:

```text
civics-questions.csv
color-preferences.md
hosting-notes.md
Logo.png
README.md
sample-result-format.csv
```

## Asset Usage Rules

### civics-questions.csv

- Use this file as the source for the civics quiz questions.
- The final quiz must include 100 civics questions from the official USCIS list.
- Each question must have exactly 4 answer options.
- Each question must have one correct answer.
- The question data must be converted into a local `questions.json` file.
- The converted `questions.json` file must be included in the final project folder.
- The `questions.json` file must work correctly in localhost and Docker.

### color-preferences.md

- Follow the provided colour preferences.
- Use professional blue `#2563EB` as the main accent colour.
- Keep the main background white.
- Keep the main text black.
- Do not use heavy colours.
- Do not use complex visual effects.

### hosting-notes.md

- Follow the updated hosting notes.
- There is currently no live website.
- No FTP access is required.
- No Namecheap upload is required right now.
- The project must run locally on localhost.
- The project must include a working `Dockerfile`.
- The project must support local CSV result download in the browser.

### Logo.png

- Add the provided logo to the quiz page.
- Place it near the top of the page.
- Keep the logo small and clean.
- Do not distort the logo.
- Do not stretch the logo.
- Use the logo from the local assets folder.

### README.md

- Include an updated README file with clear local setup steps.
- The README must explain how to run the page locally.
- The README must explain how to build and run the Docker container.
- The README must explain how the CSV result download works.

### sample-result-format.csv

- Use this file as the required sample format for the downloaded student result.
- The final quiz must generate a downloadable CSV result file in this format.
- The generated CSV must be created in the browser using JavaScript.
- No backend CSV saving is required.
- No database CSV saving is required.

---

# Corrected Hosting Requirement

The original project brief mentioned Namecheap hosting instructions.

That requirement is now updated.

The final project does not need Namecheap hosting instructions.

The project must instead include:

- Localhost setup instructions
- Docker setup instructions
- A working `Dockerfile`
- Clear run commands in `README.md`
- Browser-based CSV result download

The app must be accessible locally at:

```text
http://localhost:3000/
```

---

# Required File Structure

The final project must use this structure:

```text
civics-prep/
├── index.html                    # Main quiz page
├── style.css                     # External stylesheet
├── script.js                     # Vanilla JavaScript quiz logic
├── questions.json                # Local quiz question data
├── Dockerfile                    # Required Docker setup file
├── README.md                     # Setup and run instructions
├── sample-result-format.csv      # Sample format for downloaded student result CSV
└── assets/                       # Images and other assets
    └── Logo.png                  # Provided logo file
```

---

# Website Requirements

---

## 1. One Page Quiz Website

The project must include exactly one main quiz page.

The main page must be:

```text
index.html
```

The page must contain:

- Logo area
- Quiz title
- Student name input
- Question display area
- Four answer options
- Correct answer feedback area
- Score display
- Progress display
- Next question button
- Final result section
- Download result CSV button

The project must not be delivered as a multi-page website.

---

## 2. Technology Requirements

The project must use only:

- HTML
- CSS
- Vanilla JavaScript
- Local image assets
- Local JSON question data
- Dockerfile for local container setup

The project must not use:

- React
- Vue
- Angular
- Next.js
- Backend framework
- Database
- PHP
- Node server code
- External app builder

---

## 3. Question Data Requirements

The quiz must include:

```text
100 civics questions
```

The questions must come from the provided civics question asset.

Each question must include:

- Question text
- 4 answer options
- Correct answer value

Each question must show one correct answer after the student selects an option.

The displayed score must be based only on correct answers selected by the student.

---

## 4. Question Display Requirements

The quiz must show:

```text
One question at a time
```

Each question screen must include:

- Current question text
- Four visible answer options
- Clear selection buttons
- Feedback after selection
- A next question button

The page must not show all 100 questions at once.

---

## 5. Answer Option Requirements

Each question must have exactly:

```text
4 answer options
```

The answer options must be easy to tap on mobile.

The answer options must have enough spacing between them.

After the student selects an answer:

- The correct answer must be shown
- The selected answer must be visibly marked
- The student must not be able to change the answer for that question
- The next question button must become available

---

## 6. Correct Answer Feedback

The quiz must show clear feedback after each answer selection.

The feedback must include:

- Whether the selected answer is correct
- Whether the selected answer is incorrect
- The correct answer

The feedback should be written in simple English.

Example correct feedback:

```text
Correct!
```

Example incorrect feedback:

```text
Incorrect. Correct answer: The Constitution
```

---

## 7. Score Tracking

The quiz must track the student's score while they practice.

The score must show in this format:

```text
X out of 100 correct
```

The score must update as the student answers questions.

The score must remain visible during the quiz.

---

## 8. Final Result Display

The quiz must show a final result section after all questions are completed.

The final result must include:

- Student name
- Total questions
- Correct answers
- Incorrect answers
- Percentage score
- Date
- Time

The final result must match the values used in the downloaded CSV file.

---

## 9. CSV Result Download

The quiz must include a button to download the student's result as a CSV file.

The CSV must be generated locally in the browser using vanilla JavaScript.

The CSV must follow this column format:

```csv
student_name,total_questions,correct_answers,incorrect_answers,percentage_score,date,time
```

Example row:

```csv
John Doe,100,82,18,82%,2026-05-14,10:30 AM
```

The CSV download must work on localhost.

The CSV download must work inside the Docker container.

The project must not save CSV results on a server.

The project must not use a database for CSV results.

---

## 10. Progress Display

The page must include a simple progress display.

The progress display must include:

- Text progress
- Progress bar

The progress should show how far the student is in the quiz.

Example:

```text
Question 12 of 100
```

The progress bar must update as the student moves through the quiz.

---

## 11. Shuffle Requirement

The quiz must shuffle the question order each time the page loads.

The shuffle must:

- Randomize question order
- Keep answer correctness accurate
- Prevent duplicate questions in one quiz session
- Still allow all 100 questions to be completed

The answer options must stay linked to the correct answer.

---

## 12. Hard Questions Practice

The quiz must include hard questions practice using missed-question review.

Required behavior:

- Track questions answered incorrectly during the session
- Show a "Practice Hard Questions" button after the main quiz ends
- Start a review session using only missed questions
- Keep this feature fully local
- Use no login
- Use no database

---

# Design Requirements

---

## 13. Visual Style

The design must be:

- Simple
- Clean
- Professional
- Easy to read
- Mobile friendly

The page must use:

- Plain white background
- Black text
- Small blue accent using `#2563EB`

The design must not use:

- Heavy gradients
- Busy graphics
- Dark full-page background
- Complex animations
- Decorative clutter
- Advanced visual effects

---

## 14. Logo Placement

The page must include the provided logo.

Logo requirements:

- Use the file from `assets/Logo.png`
- Place it near the top of the page
- Keep it clear and readable
- Do not stretch it
- Do not crop it badly
- Add proper alt text

Required alt text:

```text
Civics Prep logo
```

---

## 15. Mobile-Friendly Design

The page must work well on mobile phones.

Mobile requirements:

- Responsive layout
- Large readable text
- Tap-friendly answer buttons
- Proper spacing between buttons
- No horizontal scrolling
- Quiz content fits neatly on small screens
- Works in modern mobile browsers

Desktop layout should also look clean and centered.

---

## 16. Accessibility and Readability

The quiz must be easy to read and use.

Requirements:

- Strong text contrast
- Clear button states
- Visible focus states for keyboard users
- Semantic HTML where possible
- Buttons must be real button elements
- Feedback text must be readable
- Font sizes must be comfortable on mobile

---

# Code Requirements

---

## 17. HTML Requirements

The `index.html` file must:

- Be the main entry point
- Link to `style.css`
- Link to `script.js`
- Reference the logo from the assets folder
- Include student name input
- Include final result display area
- Include CSV download button
- Use clean semantic structure
- Include a proper page title
- Include viewport meta tag for mobile responsiveness

Required page title:

```text
Civics Prep Quiz
```

---

## 18. CSS Requirements

The `style.css` file must:

- Be an external stylesheet
- Use mobile-first styling
- Keep the layout clean and simple
- Use blue `#2563EB` as the accent colour
- Keep the main background white
- Keep the main text black
- Include responsive styling for desktop
- Keep the file size under 50KB

Inline styles must not be used for the main layout.

---

## 19. JavaScript Requirements

The `script.js` file must:

- Use vanilla JavaScript only
- Control quiz flow
- Load question data from `questions.json`
- Show one question at a time
- Handle answer selection
- Show correct answer feedback
- Track score
- Track progress
- Store missed questions during the current session
- Move to the next question
- Show final result at the end
- Generate a downloadable CSV result file
- Support question shuffling
- Support missed-question practice

The code should be easy to read and organized with clear function names.

---

## 20. Dockerfile Requirements

The final project must include a working:

```text
Dockerfile
```

This is a required deliverable.

The Docker setup must:

- Serve the static website locally
- Use `nginx:alpine`
- Copy all website files into the container
- Copy `index.html` into the container
- Copy `style.css` into the container
- Copy `script.js` into the container
- Copy `questions.json` into the container
- Copy `sample-result-format.csv` into the container
- Copy the `assets` folder into the container
- Expose port `80` inside the container
- Allow local access through mapped port `3000`

The Docker setup must work with:

```bash
docker build -t civics-prep .
docker run -p 3000:80 civics-prep
```

After running the container, the quiz must open at:

```text
http://localhost:3000/
```

---

## 21. README Requirements

The final project must include a `README.md`.

The README must include:

- Project name
- Short project description
- File structure
- Local browser run instructions
- Docker build command
- Docker run command
- Localhost URL
- CSV result download explanation
- Notes that no FTP and no live hosting are required right now

The README must be simple and easy to follow.

---

# Final Deliverables

The final delivery must include the following files:

### 1. Main HTML File

File name:

```text
index.html
```

Requirements:

- Complete quiz page
- Linked stylesheet
- Linked script file
- Logo included from assets folder
- Student name input
- Final result display
- CSV result download button

---

### 2. CSS File

File name:

```text
style.css
```

Requirements:

- External stylesheet
- Mobile-first responsive design
- White background
- Black text
- Blue accent colour

---

### 3. JavaScript File

File name:

```text
script.js
```

Requirements:

- Vanilla JavaScript
- Quiz logic
- 100 questions
- Score tracking
- Feedback handling
- Progress handling
- Final result display
- CSV result download
- Missed-question practice

---

### 4. Question Data File

File name:

```text
questions.json
```

Requirements:

- Local question data file
- Must work in Docker
- Must include all 100 questions
- Must include 4 answer options per question
- Must include correct answer value per question

---

### 5. Dockerfile

File name:

```text
Dockerfile
```

Requirements:

- Required final deliverable
- Working Docker setup
- Static website served through container
- Compatible with port mapping to localhost
- Must run with `docker build -t civics-prep .`
- Must run with `docker run -p 3000:80 civics-prep`

---

### 6. README File

File name:

```text
README.md
```

Requirements:

- Clear local setup instructions
- Clear Docker instructions
- Clear CSV download explanation
- No Namecheap steps
- No FTP steps

---

### 7. Sample Result Format File

File name:

```text
sample-result-format.csv
```

Requirements:

- Shows expected CSV result columns
- Shows one sample row
- Used as a reference for generated result CSV

---

### 8. Assets Folder

Folder name:

```text
assets/
```

Required asset:

```text
Logo.png
```

---

# Scope Restrictions

The final delivery must not include:

- React app
- Framework-based app
- Backend server
- Login system
- User accounts
- Payment setup
- Database
- Admin panel
- Namecheap FTP upload process
- Live domain setup
- Complex animation
- Advanced design system
- Multi-page website
- Server-side CSV storage

This project is intentionally limited to a simple one page static quiz website.

---

# Testing Requirements

The developer must test the project in:

- Desktop browser
- Mobile browser
- Browser mobile view
- Localhost environment
- Docker container environment

Testing must confirm:

- Page loads correctly
- Logo appears correctly
- CSS loads correctly
- JavaScript runs correctly
- 100 questions are available
- One question appears at a time
- Each question has 4 options
- Correct answer appears after selection
- Score updates correctly
- Final result appears correctly
- CSV result download works correctly
- Downloaded CSV matches `sample-result-format.csv`
- Progress display updates correctly
- Quiz can finish properly
- Missed-question practice works correctly
- Layout works on mobile
- Docker build works
- Docker run works
- App opens at `http://localhost:3000/`

---

# Technical Skills Required

The developer should have experience with:

- HTML
- CSS
- Vanilla JavaScript
- Mobile friendly web design
- Quiz app logic
- Score tracking
- Result tracking
- Downloadable CSV export
- Static site structure
- Basic Docker setup
- Simple README documentation

Education website experience is a plus.

Quiz app experience is a plus.

---

# Evaluation Criteria

The project will be evaluated against the provided requirements, including:

- Correct static website setup
- Correct use of HTML, CSS, and vanilla JavaScript
- Correct use of 100 civics questions
- Correct four-option answer format
- Correct answer feedback
- Correct score tracking
- Correct final result display
- Correct CSV result download
- Correct progress display
- Mobile-friendly design
- Logo usage
- Correct use of blue accent colour
- No frameworks
- No backend
- No database
- No server-side CSV storage
- Working Dockerfile
- Clear README instructions
- Clean and readable code

---

# Level, Pricing, and Delivery

**Level:**
1 - 2 (Preferred 2)

# Final Goal

The final website must help students practice civics questions in a simple and easy way.

The final project must:

- Work locally
- Work through Docker
- Include a working Dockerfile
- Be easy to use on mobile
- Show one question at a time
- Show 4 answer options
- Show the correct answer
- Track score as X out of 100 correct
- Show final result
- Download result as a CSV file on localhost
- Use a plain white design with a small blue accent
- Include the provided logo
- Avoid unnecessary complexity
