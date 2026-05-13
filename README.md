# NexaAudit - Frontend Dashboard

[![Live Demo](https://img.shields.io/badge/Live_Demo-Online-success?style=for-the-badge)](https://nexaaudit-frontend.vercel.app/) 
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Lovable AI](https://img.shields.io/badge/Lovable_AI-000000?style=for-the-badge&logo=sparkle&logoColor=white)](https://lovable.dev/)

This is the client-facing dashboard for **[NexaAudit](https://github.com/NisargKumarGharde/nexaaudit)**, an AI-powered financial fraud detection engine. 

---

## 🎯 Project Philosophy: AI-Augmented Development

As an engineer specializing in Data Pipelines and Backend Architecture, my goal for this UI was **speed to execution**. 

Rather than spending weeks writing CSS and centering divs from scratch, I utilized **Lovable AI** to rapidly generate the React boilerplate, Tailwind styling, and base component architecture. This allowed me to dedicate my core engineering bandwidth to where it mattered most: **architecting the complex, multi-cloud Retrieval-Augmented Generation (RAG) backend.**

My primary engineering focus on this frontend was strictly integration: managing the React application state, securing cross-origin requests (CORS), and wiring the UI components to seamlessly consume data from my custom Go API.

## ⚙️ Core Features & Integration

* **Asynchronous File Uploads:** A drag-and-drop zone that successfully formats multipart/form-data payloads to stream PDF bytes directly to the Go backend.
* **Real-time API Polling:** The dashboard actively fetches aggregated data from PostgreSQL to display total documents, total financial value, and flagged anomalies.
* **State Management:** React hooks are utilized to manage the loading states during the 3-5 second window while the backend calls the Google Gemini AI and Pinecone Vector APIs.
* **Responsive UI:** A clean, accessible, Tailwind-powered interface that scales flawlessly across mobile and desktop environments.

## 🛠️ Local Development Setup

### 1. Clone the repository
```bash
git clone [https://github.com/NisargKumarGharde/nexaaudit-insights.git](https://github.com/NisargKumarGharde/nexaaudit-insights.git)
cd nexaaudit-insights
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
To run this locally, you must have the Go Backend running on port 8082. Create a .env file in the root directory:
```
VITE_API_URL=http://localhost:8082/api/v1
```

### 4. Start the Development Server
```bash
npm run dev
```

👉 To see the full system architecture, Go backend code, and engineering journal, visit the [Main NexaAudit Repository](https://github.com/NisargKumarGharde/nexaaudit).
