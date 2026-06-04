# AI Resume Analyzer

An AI-powered resume screening platform built to help job seekers evaluate how well their resume matches a specific job description.

🔗 Live:

## Why I built this

Recruiters often spend a significant amount of time reviewing resumes and comparing them with job requirements. At the same time, candidates frequently don't know whether their resume is a good fit for a role before applying.

I built this project to automate the initial screening process using AI. The goal was to create a tool that can instantly analyze a resume, compare it with a job description, and provide actionable feedback.

This project also helped me gain hands-on experience with full-stack development, PDF processing, database management, authentication, and AI integration.

## What it does

Users can upload their resume in PDF format and provide a job description.

The system extracts text from the resume, analyzes it against the provided job description using AI, and generates a match score along with detailed feedback.

The feedback helps users understand strengths, missing skills, and areas where their resume can be improved to better align with the job requirements.

## Tech

| Layer          | Technology                    |
| -------------- | ----------------------------- |
| Frontend       | React.js + Vite + CSS Modules |
| Backend        | Node.js + Express.js          |
| Database       | MongoDB                       |
| Authentication | Firebase Authentication       |
| File Upload    | Multer                        |
| PDF Processing | PDF-Parse                     |
| AI Analysis    | Cohere AI                     |
| Deployment     | Vercel + Render               |

## Features Worth Mentioning

* AI-powered resume analysis using Cohere AI
* Resume upload and PDF text extraction
* Job description matching
* Resume match score generation
* Detailed AI feedback and suggestions
* Secure Firebase authentication
* MongoDB-based data storage
* Responsive dashboard interface
* Resume history tracking per user



### Clone Repository

```bash
git clone https://github.com/ivishal/ai-resume-analyzer.git
cd ai-resume-analyzer
```

### Backend

```bash
cd backend_ai
npm install
npm start
```

### Frontend

```bash
cd Ai_Resume_analyser
npm install
npm run dev
```

## Required Environment Variables

```env
MONGO_URI=
COHERE_API_KEY=
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
```

## Folder Structure

```text
├── backend_ai/
│   ├── Controllers/
│   ├── Models/
│   ├── Routes/
│   ├── uploads/
│   ├── conn.js
│   └── index.js
│
└── Ai_Resume_analyser/
    ├── src/
    │   ├── Components/
    │   ├── Pages/
    │   ├── utils/
    │   └── Context/
    └── vite.config.js
```

## Connect With Me

LinkedIn: https://www.linkedin.com/in/vishal-shankhdhar-2753a8410

Built by Vishal Shankhdhar
