# Civics Prep Quiz

Simple single-page quiz app for USCIS civics practice using HTML, CSS, and vanilla JavaScript.

## Files

```text
civics-prep/
|-- index.html
|-- style.css
|-- script.js
|-- questions.json
|-- Dockerfile
|-- README.md
|-- hosting_instructions.txt
|-- sample-result-format.csv
`-- assets/
    `-- logo.png
```

## Run Locally

Use any static server so `questions.json` can be fetched by the browser.

### Option 1: Python

```bash
python -m http.server 3000
```

Open `http://localhost:3000/`.

### Option 2: VS Code Live Server

Open the folder and run a static server on port `3000` if available.

## Docker

Build the image:

```bash
docker build -t civics-prep .
```

Run the container:

```bash
docker run -p 3000:80 civics-prep
```

Open `http://localhost:3000/`.

## CSV Result Download

After the quiz ends, use the download button to save a CSV in this format:

```csv
student_name,total_questions,correct_answers,incorrect_answers,percentage_score,date,time
```

The file is generated locally in the browser. No backend, database, or server-side storage is used.

## Notes

- The quiz shuffles the question order every time a new session starts.
- Hard-question practice mode uses the questions marked `is_hard = TRUE`.
- A cumulative 100-minute timer is applied across the quiz and auto-submits when time reaches zero.
- `hosting_instructions.txt` includes the requested Namecheap shared hosting upload steps via FTP.
