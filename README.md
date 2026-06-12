# Employee Management Application

A full-stack, enterprise-grade Employee Management system built to streamline workforce tracking, profile handling, and access permissions. The application features a robust custom networking layer utilizing React hooks and Axios for automated, secure cookie-based session management.

## 🚀 Features

- **Employee Directory:** View, search, filter, and track employee profiles.
- **Custom React API Layer (`useApi`):** A custom, reference-stable hook that isolates API operations, preventing infinite re-render loops within the React lifecycle.
- **Cookie-Based Authentication:** Seamless and secure cross-origin session management utilizing `withCredentials: true`.
- **Hierarchical Git Strategy:** Multi-tier `.gitignore` configuration ensuring backend secrets (`config.env`) remain untracked while optimizing repository indexing.
- **Responsive Frontend:** Fast and interactive UI built using Vite and optimized for performance.

---

## 🛠️ Tech Stack

**Frontend:**
- React (Hooks, Context/Redux)
- React Router DOM (Dynamic & Protected Routing)
- Axios (HTTP Client Wrapper)
- Vite (Build Tool & Dev Server)

**Backend:**
- Node.js & Express
- Environment Variables Config (via `.env` / `config.env`)

---

