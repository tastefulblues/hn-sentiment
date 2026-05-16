# HN Sentiment Tracker

A full-stack web app that tracks sentiment trends across Hacker News top stories over time.

## What it does
- Fetches the top 10 Hacker News stories every minute via the HN API
- Runs sentiment analysis on each story title (Simply with a dictionary)
- Stores results in a PostgreSQL database
- Displays a live sentiment breakdown chart and story list in React

## Tech Stack
- **Backend:** Node.js, Express
- **Database:** PostgreSQL
- **Frontend:** React, Recharts
- **Other:** node-cron for scheduled fetching, sentiment for NLP analysis

## Running locally

### Prerequisites
- Node.js
- PostgreSQL

### Setup
1. Clone the repo
```bash
   git clone https://github.com/tastefulblues/hn-sentiment.git
   cd hn-sentiment
```
2. Install backend dependencies
```bash
   npm install
```
3. Install frontend dependencies
```bash
   cd client && npm install
```
4. Create a `.env` file in the root folder

5. Start the backend
```bash
   npm run dev
```
6. Start the frontend
```bash
   cd client && npm start
```

## Future improvements
- Upgrade sentiment analysis using an LLM API
- Add topic filtering and keyword tracking
- Deploy to a live URL
