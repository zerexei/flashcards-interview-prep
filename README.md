# AD. Flashcards — Technical Interview Prep

[![React](https://img.shields.io/badge/React-18-blue?logo=react&logoColor=white)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white)](#)
[![Vite](https://img.shields.io/badge/Vite-6-purple?logo=vite&logoColor=white)](#)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwind-css&logoColor=white)](#)
[![License](https://img.shields.io/badge/License-MIT-green)](#)

A modern, fast, and feature-rich **technical flashcard study application** designed for computer science and software engineering interview prep. Features a premium dark UI and optional **AI-powered answer evaluation** using Google Gemini.

---

## Key Features

- 🃏 **Smart Study Mode**: Filter flashcards dynamically by technical categories and concepts.
- 🤖 **Deep Mode (AI Evaluation)**: Type your answers and get strict, constructive feedback, scores (1–5), list of correct items, missing concepts, and suggestions powered by Gemini.
- 🎨 **Premium Aesthetic**: Built on top of the `@ad-technology-inc/design-system` using **Tailwind CSS v4**'s CSS-first theme system, sleek glassmorphism, responsive controls, and micro-animations.
- ⚡ **Zero Config / Local First**: Firebase and Gemini are fully optional. If no keys are provided, the app runs locally with automatic `localStorage` persistence and pre-seeded interview cards.

---

## Tech Stack & Architecture

- **Core**: React 18, TypeScript, Vite 6
- **Styling**: Tailwind CSS v4, `@ad-technology-inc/design-system`, Inter, JetBrains Mono
- **Database/Auth (Optional)**: Firebase Auth + Firestore Lite
- **AI Engine (Optional)**: Google Gemini API via `@google/genai`

### Folder Directory Layout
The project follows a clean, single-app structure organized by concern:
```text
src/
├── components/     # Reusable layout and interface components (Header, Footer, Form)
├── context/        # Global React Context providers (AuthContext)
├── hooks/          # Custom hooks (useFlashcards, useModel)
├── pages/          # Page level components (Login, GamePage, AdminPage)
├── services/       # Services (Firestore database and localStorage fallback layer)
├── types/          # Shared type and interface declarations
├── utils/          # Global utilities (database instances, Tailwind class merger)
├── index.css       # Core stylesheets and brand overrides
└── main.tsx        # Application entry point
```

---

## Getting Started

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### 2. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 3. Optional Environment Configurations
Copy the template `.env.example` to `.env` and fill in your keys:
```bash
cp .env.example .env
```

| Key | Description |
|---|---|
| `VITE_FIREBASE_API_KEY` | Set this (and the other VITE_FIREBASE_* vars) to enable Firebase Auth and Firestore persistence. If empty, the app runs in **Local Mode** (bypassed login, `localStorage` persistence). |
| `VITE_FIREBASE_ADMIN_UID` | The Firebase User ID allowed to access the card management creator panel. |
| `VITE_GOOGLE_GEN_AI_KEY` | Set your Gemini API key to enable the AI-powered answer evaluation in Deep Mode. |

### 4. Running Locally
Start the development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Scripts

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Bundles the application for production deployment.
- `npm run lint`: Runs ESLint check across all TSX and TS files.
- `npm run preview`: Locally previews the production build.
