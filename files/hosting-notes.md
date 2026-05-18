# Hosting Notes

## Provider

The project will run locally on the developer's machine using localhost. Deployment to a live domain can be handled later if needed.

## Access

The developer should run and test the project locally.

## Local URL Structure

The quiz should be accessible locally at:

```text
http://localhost:3000/
```

## File Structure

Keep the project files in the main project folder:

```text
civics-prep/
├── index.html                    # Main quiz page
├── style.css                     # Stylesheet
├── script.js                     # JavaScript logic
├── questions.json                # Local quiz question data, if converted from CSV
├── Dockerfile                    # Docker setup file
├── README.md                     # Local and Docker setup instructions
├── sample-result-format.csv      # Sample format for downloaded student result CSV
└── assets/                       # Images and other assets
    └── Logo.png                  # Logo file
```

## File Requirements

### index.html

- Entry point for the quiz
- Load `style.css` and `script.js` from the same directory
- Reference the logo from `assets/Logo.png`
- Must work as a static HTML file
- Include a student name input before starting the quiz
- Include a final result section after quiz completion
- Include a button to download the student result as a CSV file

### style.css

- External stylesheet, not inline styles
- Mobile-first responsive design
- Keep file size reasonable, preferably under 50KB
- Use clean and readable styling
- Use white background, black text, and blue accent colour `#2563EB`

### script.js

- Vanilla JavaScript only
- No frameworks
- Load quiz questions from `questions.json` or include the questions directly in this file
- Track score during the current quiz session
- Show the final result after the quiz ends
- Generate a downloadable CSV result file in the browser
- The CSV result should follow the format shown in `sample-result-format.csv`

### questions.json

- Use this file if the provided civics question CSV is converted into JSON
- Must include all 100 civics questions
- Each question must include 4 answer options
- Each question must include the correct answer value
- Must work locally and inside Docker

### assets/Logo.png

- Logo image file
- Recommended size: 200x50 pixels or similar
- Format: PNG with transparent background preferred

### sample-result-format.csv

This file is only a sample format for the student result export.

The quiz should generate a downloadable CSV file with these columns:

```csv
student_name,total_questions,correct_answers,incorrect_answers,percentage_score,date,time
```

Example row:

```csv
John Doe,100,82,18,82%,2026-05-14,10:30 AM
```

The generated CSV must be created in the browser using JavaScript.

No backend and no database are required.

### Dockerfile

- Include a working `Dockerfile`
- The Docker setup should serve the static files locally
- Use a lightweight web server image such as `nginx:alpine`
- The app should be accessible from the browser after running the Docker container

Example Docker behavior:

```text
Build image:
docker build -t civics-prep .

Run container:
docker run -p 3000:80 civics-prep

Open in browser:
http://localhost:3000/
```

## Technical Constraints

- Static files only
- No PHP
- No Node backend
- No database
- No FTP upload required
- No live domain required
- No server-side CSV saving
- Result CSV must be downloaded locally through the browser
- Must run locally in a browser
- Must also run through Docker
- Use HTML, CSS, JavaScript, local JSON or CSV data, and image assets only

## Docker Requirements

The Docker setup must:

- Serve the project as a static website
- Copy all project files into the container
- Expose the app through port `80` inside the container
- Allow local access through port `3000`
- Work with the command:

```bash
docker build -t civics-prep .
docker run -p 3000:80 civics-prep
```

## Testing

After setup, test the quiz locally at:

```text
http://localhost:3000/
```

Test on:

- Desktop browser
- Mobile browser or browser mobile view
- Docker container environment

Make sure:

- The page loads correctly
- The logo appears correctly
- CSS loads correctly
- JavaScript works correctly
- Quiz questions display properly
- Buttons and interactions work properly
- The layout is responsive on mobile
- Score tracking works correctly
- Final result appears after quiz completion
- CSV result download works correctly
- The downloaded CSV matches `sample-result-format.csv`
- Docker build works correctly
- Docker run works correctly

## Backup

Keep a local copy of all files before making major changes.

If something breaks, the project should be easy to restore from the local backup.

## Questions?

If any setup detail is unclear, ask before final delivery.
