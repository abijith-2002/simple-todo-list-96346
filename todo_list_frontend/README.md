# Minimal Todo – React Frontend

A modern, minimalistic React frontend for a simple Todo application.

## Features

- User authentication: login and registration
- Full CRUD for todo tasks
- Mark tasks as complete/incomplete
- Filter tasks by status (All, Active, Completed)
- Header with app title and user menu
- Sidebar for filters
- Modal dialog for creating/editing tasks
- Minimal light theme using the palette:
  - Primary: `#1976D2`
  - Secondary: `#424242`
  - Accent: `#FFC107`

## Getting Started

1. Copy `.env.example` to `.env` and set your backend API URL:
   ```
   REACT_APP_API_BASE_URL=http://localhost:5000
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the dev server:
   ```
   npm start
   ```

## Scripts

- `npm start` – Run dev server
- `npm test` – Run tests (non-watch mode)
- `npm run build` – Build production bundle

## Environment

- `REACT_APP_API_BASE_URL` – Base URL for your REST API (e.g., http://localhost:5000)

## API Endpoints (expected)

- `POST /auth/login` – Body: `{ email, password }` -> `{ token, user }`
- `POST /auth/register` – Body: `{ name, email, password }` -> `{ token, user }`
- `GET /todos` – Returns `Todo[]`
- `POST /todos` – Body: `{ title, description? }` -> `Todo`
- `PATCH /todos/:id` – Body: partial updates -> `Todo`
- `DELETE /todos/:id` – Deletes a todo

Where `Todo` is:
```
{
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}
```

## Notes

- This project avoids heavy UI frameworks and uses accessible, semantic HTML with CSS variables.
- Public functions are annotated with a `PUBLIC_INTERFACE` comment in code for clarity.
