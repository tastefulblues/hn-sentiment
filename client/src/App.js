import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import './App.css';

function App() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetch("https://your-railway-url.up.railway.app/api/stories")
      .then((res) => res.json())
      .then((data) => setStories(data));
  }, []);

  const chartData = [
    { label: "Positive", count: stories.filter((s) => s.sentimentLabel === "positive").length },
    { label: "Neutral", count: stories.filter((s) => s.sentimentLabel === "neutral").length },
    { label: "Negative", count: stories.filter((s) => s.sentimentLabel === "negative").length },
  ];

  return (
    <div className = "container">
      <h1 className = "header">HN Sentiment Tracker</h1>
      <p className ="subheader">Tracking sentiment across Hacker News</p>

      <h2 className = "section-title">Sentiment Breakdown</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="label" stroke = "#888"/>
          <YAxis stroke = "#888"/>
          <Tooltip contentStyle={{backgroundColor: "#1a1a1a", border: "1px solid #2a2a2a"}} />
          <Bar dataKey="count" fill="#f97316" radius = {[4,4,0,0]} />
        </BarChart>
      </ResponsiveContainer>

      <h2 className = "section-title">Stories</h2>
      {stories.map((story) => (
        <div key={story.id} className = "story-card">
          <p className = "story-title">{story.title}</p>
          <span classname = {`sentiment-label ${story.sentimentlabel}`}>
            {story.sentimentLabel}
          </span>
        </div>
      ))}
    </div>
  );
}

export default App;
