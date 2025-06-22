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

## 🏗️ Project Structure

