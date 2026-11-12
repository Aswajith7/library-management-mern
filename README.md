# 📚 Library Management System

A full-stack MERN application for managing a library's book inventory and lending cycle. The application allows librarians to catalog books, track availability in real time, issue books to borrowers, and manage returns and deletions through a responsive single-page dashboard.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite, Axios
- **Backend:** Node.js, Express 5, Mongoose
- **Database:** MongoDB Atlas

---

## ✨ Features

- **Book Catalog:** View all cataloged books with live status indicators (available vs. issued) and author details.
- **Add Books:** Add new titles and authors with duplicate title checks and input validation.
- **Issue Books:** Issue available books by assigning a borrower's name, tracking issue timestamps.
- **Return Books:** Return currently issued books to make them available for lending again.
- **Delete Books:** Remove unissued books with confirmation safeguards (issued books are protected from deletion).
- **Borrowed Books Overview:** Dedicated table showing all active loans and their borrowers.
- **Custom Hook Architecture:** Centralized asynchronous state management and API calls inside `useBooks`.

---

## 📁 Project Structure

```text
Library/
├── backend/
│   ├── config/             # Database connection setup (db.js)
│   ├── controllers/        # Request handlers (bookController.js)
│   ├── models/             # Mongoose schemas (Book.js, transaction.js, user.js)
│   ├── routes/             # API routes (bookRoutes.js)
│   ├── .env.example        # Backend environment template
│   ├── package.json        # Backend dependencies and metadata
│   └── server.js           # Express app entry point
├── frontend/
│   ├── src/
│   │   ├── components/     # UI components (BookCard, BookForm, BookList, BorrowedList)
│   │   ├── hooks/          # Custom hooks (useBooks.js)
│   │   ├── api.js          # Axios client instance
│   │   ├── App.jsx         # Main dashboard view
│   │   ├── index.css       # Global styles
│   │   └── main.jsx        # React root mounting
│   ├── .env.example        # Frontend environment template
│   ├── index.html          # HTML shell
│   ├── package.json        # Frontend dependencies and scripts
│   └── vite.config.js      # Vite build configuration
└── README.md
```

---

## 🚀 Setup & Installation

### 1. Clone Repository
```bash
git clone https://github.com/Aswajith7/library-management-mern.git
cd library-management-mern
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
```
Update `backend/.env` with your actual MongoDB connection string:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```
Start the backend server:
```bash
node server.js
```
The server will run at `http://localhost:5000`.

### 3. Frontend Setup
In a new terminal window:
```bash
cd frontend
npm install
cp .env.example .env
```
Ensure `frontend/.env` points to the backend API:
```env
VITE_API_URL=http://localhost:5000/api
```
Start the Vite development server:
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)
| Variable | Description | Example |
| :--- | :--- | :--- |
| `PORT` | Port number for the Express server | `5000` |
| `MONGO_URI` | MongoDB Atlas connection string URI | `mongodb+srv://user:pass@cluster.mongodb.net/library?retryWrites=true&w=majority` |

### Frontend (`frontend/.env`)
| Variable | Description | Example |
| :--- | :--- | :--- |
| `VITE_API_URL` | Base URL for backend REST API endpoints | `http://localhost:5000/api` |

---

## 🔮 Possible Improvements

- **Client-Side Routing:** Add `react-router` for separate multi-page views (e.g. Catalog, Borrowed, Analytics).
- **Authentication & Roles:** Implement JWT-based login with role-based access control (Admin vs. Member).
- **Search, Filter & Pagination:** Add search bars and category filters for large collections.
- **Loan Durations & Fines:** Implement due dates, overdue notifications, and fee calculations.
- **Modal Dialogs:** Replace browser `window.confirm` and inline issue inputs with accessible modal dialogs.
- **Caching & Optimistic Updates:** Integrate TanStack React Query for request caching, deduping, and background refetching.

