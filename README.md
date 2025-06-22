# 🗂️ Job Import History Tracking System

A full-stack project using **Node.js**, **Next.js**, **MongoDB**, and **Bull (Redis)** to fetch, process, and track job listings from RSS feeds. This system automatically stores and updates jobs in the database and maintains a detailed log of each import for dashboard display and analytics.

---

## 🚀 Features

- 📰 Fetch job listings from multiple RSS feed sources.
- ⚙️ Normalize and store data in MongoDB using Mongoose.
- 🧱 Queue each job using Bull (Redis) for asynchronous processing.
- 🔁 Upsert jobs by `guid` or `jobid` (insert if new, update if exists).
- 🧾 Import logs track total, new, updated, and failed jobs per run.
- ⏰ Cron-based scheduler runs fetch jobs every few minutes/hours.
- 📊 View paginated logs and stats on a frontend dashboard.

---

## 📁 Project Structure

```
project/
├── backend/
│   ├── controllers/       # Route logic (logs, dashboard stats)
│   ├── models/            # Mongoose schemas (Job, ImportLog)
│   ├── queue/             # Bull Redis setup and processing
│   ├── routes/            # Express API endpoints
│   ├── utils/             # XML parser, cleaner, fetcher
│   ├── server.js          # Main Express app
│   ├── .env               # Environment config
|   └── package.json           # Shared dependencies / root scripts
│
├── frontend/
│   ├── components/        # UI components (tables, cards)
│   ├── pages/             # Next.js pages
│   ├── utils/             # API calls, date formatting
│   ├── public/            # Static files (icons, assets)
│   ├── .env               # Environment config
|   └── package.json           # Shared dependencies / root scripts
├── README.md              # Project documentation
```

---

## 🧰 Tech Stack

| Layer       | Tech Used                  |
|-------------|----------------------------|
| Frontend    | Next.js, React, Tailwind   |
| Backend     | Node.js, Express.js        |
| Database    | MongoDB + Mongoose         |
| Queue       | Bull with Redis Cloud      |
| Parser      | xml2js for RSS/Atom feeds  |
| Scheduler   | node-cron                  |
| Deployment  | Render (backend), Vercel (frontend)

---
```
## 🔄Import Flow Diagram

External RSS/XML Feeds
        ↓
Axios fetch + XML → JSON parse
        ↓
Jobs pushed into Redis Queue (Bull)
        ↓
Worker consumes jobs asynchronously
        ↓
MongoDB: Insert / Update Job Collection
        ↓
Import Log Created in import_logs collection
```
## ⚙️ Setup Instructions
Clone the Repository

```bash
git clone https://github.com/atulchune/job-import-tracker.git
cd job-import-tracker

### 📌 Prerequisites
- Node.js 18+
- Redis (local or Redis Cloud)
- MongoDB instance (local or MongoDB Atlas)

### 🔧 Backend Setup

```bash
cd backend
npm install
```

**.env**
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/import-tracker
REDIS_URL=redis://default:<password>@<host>:<port>
```

Start the backend:

```bash
npm start
```

### 💻 Frontend Setup

```bash
cd frontend
npm install
```

**.env**
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

Run frontend:

```bash
npm run dev
```

---

## 🔑 Key Logic & Architecture

### 🧠 Job Import Flow:
1. **Feeds** are fetched using `axios` and converted from XML to JSON.
2. Each job is **normalized** with consistent fields like `guid`, `pubDate`, `title`, etc.
3. Jobs are **queued** into Bull (`jobQueue`).
4. A **worker** consumes the queue, updating or inserting each job into MongoDB.
5. Import **summary statistics** (inserted, updated, failed) are logged into `ImportLog`.

### 🧰 Tools Used:
- **Express.js** – REST API backend
- **Next.js** – Frontend with dynamic pages
- **MongoDB** – Persistent job storage
- **Bull + Redis** – Queue and background processing
- **node-cron** – Scheduled job import
- **axios + fast-xml-parser** – XML feed handling

---

## 🔗 API Endpoints

### 🧾 Import Logs

### 📡 API Endpoints

| Method | Endpoint                             | Description                          |
|--------|--------------------------------------|--------------------------------------|
| GET    | `/api/import_logs?page=1&limit=10`   | Fetch paginated import log entries   |
| GET    | `/api/dashboard_counts`              | Fetch dashboard summary counts       |


---

## 📌 Assumptions

- All job feeds are RSS-based and contain `guid`, `title`, `description`, and `pubDate`.
- No authentication layer is required for viewing logs.
- Redis and MongoDB services are available and properly configured.
- The frontend and backend are hosted under different subdomains or ports.

---

## 🔮 Future Enhancements

- 🔐 Add authentication and roles (admin, viewer)
- 📤 Add job export to CSV/Excel
- 🕵️‍♀️ Detailed view of failed jobs
- 📅 Scheduling UI to trigger re-fetch
- 🌍 Support more feed types (Atom, JSON feeds)
- 📈 Add charts for trends (e.g., new jobs/week)

---

## 🙌 Author

Made with ❤️ by Atul Chune

