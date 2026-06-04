require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Sentiment = require('sentiment');
const pool = require('./db');
const cron = require('node-cron');

const app = express();
const sentiment = new Sentiment();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
    res.json({message: 'Server is working.'});
});

app.get('/api/db-test', async (req, res) => {
    try{
        const result = await pool.query('SELECT NOW()');
        res.json({ connected: true, time: result.rows[0].now});
    } catch (error){
        res.status(500).json({ connected: false, error: error.message});
    }
});

app.get('/api/stories', async (req, res) => { 
    try
    {
        const stories = await fetchAndStoreStories();
        res.json(stories);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
});

async function fetchAndStoreStories() {
    const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
    const ids = await response.json();
    const top10 = ids.slice(0, 10);

    const stories = await Promise.all(
        top10.map(async (id) => {
            const storyRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
            const story = await storyRes.json();
            const analysis = sentiment.analyze(story.title || '');
            const label = analysis.score > 0 ? 'positive' : analysis.score < 0 ? 'negative' : 'neutral';

            await pool.query(
                `INSERT INTO stories (id, title, url, score, by, time)
                 VALUES ($1, $2, $3, $4, $5, $6)
                 ON CONFLICT (id) DO NOTHING`,
                [story.id, story.title, story.url, story.score, story.by, story.time]
            );

            await pool.query(
                `INSERT INTO sentiment_scores (story_id, sentiment_score, sentiment_label)
                 VALUES ($1, $2, $3)
                 ON CONFLICT (story_id) DO NOTHING`,
                [story.id, analysis.score, label]
            );

            return { ...story, sentimentScore: analysis.score, sentimentLabel: label };
        })
    );

    return stories;
}   

cron.schedule('* * * * *', () => {
    console.log('Running scheduled fetch...');
    fetchAndStoreStories();
});
app.listen(PORT, () => {console.log(`Server is running on ${PORT}`);
});