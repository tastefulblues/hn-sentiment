import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import './App.css';

function App() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/stories")
      .then((res) => res.json())
      .then((data) => setStories(data));
  }, []);

  const chartData = [
    { label: "Positive", count: stories.filter((s) => s.sentimentLabel === "positive").length },
    { label: "Neutral", count: stories.filter((s) => s.sentimentLabel === "neutral").length },
    { label: "Negative", count: stories.filter((s) => s.sentimentLabel === "negative").length },
  ];

  return (
    <div style={{ padding: "2rem" }}>
      <h1 className = "header">HN Sentiment Tracker</h1>

      <h2>Sentiment Breakdown</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#f97316" />
        </BarChart>
      </ResponsiveContainer>

      <h2>Stories</h2>
      {stories.map((story) => (
        <div key={story.id}>
          <p>{story.title} — {story.sentimentLabel}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
