import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const DEFAULT_TASKS = [
  { id: 1, title: "Plan the day", done: true },
  { id: 2, title: "Design the dashboard", done: false },
  { id: 3, title: "Review project requirements", done: true },
  { id: 4, title: "Prepare development tasks", done: true },
  { id: 5, title: "Test the application", done: false },
  { id: 6, title: "Review final output", done: false }
];

function readTasks() {
  try {
    const saved = JSON.parse(localStorage.getItem("focusflow_tasks"));
    return Array.isArray(saved) ? saved : DEFAULT_TASKS;
  } catch { return DEFAULT_TASKS; }
}

function estimateTask(description) {
  const text = description.trim().toLowerCase();
  if (!text) return null;
  const words = text.split(/\s+/).length;
  let minutes = 20 + Math.min(words * 2, 30);
  const rules = [
    [/email|message|reply|call|schedule|plan/, 10],
    [/read|review|research|study|document|report/, 25],
    [/design|wireframe|prototype|presentation|slides/, 45],
    [/code|develop|build|implement|debug|program|website|app/, 60],
    [/test|testing|qa|validate|check|fix/, 35],
    [/write|draft|content|blog|essay/, 35],
    [/analy[sz]e|data|spreadsheet|dashboard|excel/, 50],
    [/meeting|interview|workshop/, 30]
  ];
  for (const [pattern, value] of rules) {
    if (pattern.test(text)) { minutes = value + Math.min(Math.floor(words / 8) * 5, 20); break; }
  }
  if (/simple|quick|small|minor/.test(text)) minutes = Math.max(10, Math.round(minutes * 0.65));
  if (/complex|detailed|large|complete|full|end-to-end/.test(text)) minutes = Math.round(minutes * 1.6);
  minutes = Math.max(10, Math.min(180, Math.round(minutes / 5) * 5));
  const confidence = words < 4 ? "Low" : words < 9 ? "Medium" : "Medium";
  return { minutes, confidence };
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function App() {
  const [tasks, setTasks] = useState(readTasks);
  const [newTask, setNewTask] = useState("");
  const [focus, setFocus] = useState(() => localStorage.getItem("focusflow_focus") || "");
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [mode, setMode] = useState("Focus");
  const [description, setDescription] = useState("");
  const [estimate, setEstimate] = useState(null);
  const [notice, setNotice] = useState("");

  useEffect(() => localStorage.setItem("focusflow_tasks", JSON.stringify(tasks)), [tasks]);
  useEffect(() => localStorage.setItem("focusflow_focus", focus), [focus]);
  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => setSeconds(s => {
      if (s <= 1) {
        clearInterval(timer);
        setRunning(false);
        setNotice(mode === "Focus" ? "Focus session complete. Time for a short break!" : "Break complete. Ready for another focus session?");
        return 0;
      }
      return s - 1;
    }), 1000);
    return () => clearInterval(timer);
  }, [running, mode]);

  const completed = tasks.filter(t => t.done).length;
  const progress = tasks.length ? Math.round(completed / tasks.length * 100) : 0;
  const circumference = 2 * Math.PI * 112;
  const offset = circumference * (1 - seconds / ((mode === "Focus" ? 25 : 5) * 60));

  function changeMode(next) {
    setMode(next); setRunning(false); setSeconds((next === "Focus" ? 25 : 5) * 60); setNotice("");
  }
  function addTask(e) {
    e.preventDefault();
    const title = newTask.trim();
    if (!title) return;
    setTasks([...tasks, { id: Date.now(), title, done: false }]);
    setNewTask("");
  }
  function toggleTask(id) {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  }
  function removeTask(id) {
    setTasks(tasks.filter(t => t.id !== id));
  }
  function runEstimate() {
    const result = estimateTask(description);
    setEstimate(result);
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="FocusFlow home">Focus<span>Flow</span></a>
        <div className="tagline"><span className="spark">✧</span> Make time for what matters</div>
        <div className="top-pill"><span className="status-dot"></span> Your focus space</div>
      </header>

      <section className="welcome">
        <div>
          <p className="eyebrow">A LITTLE MORE FOCUS, EVERY DAY</p>
          <h1>Find your <span>flow.</span></h1>
          <p className="subhead">One task at a time. One focused session at a time.</p>
        </div>
        <div className="date-chip">✦ &nbsp; Progress over perfection</div>
      </section>

      <section className="focus-card">
        <div className="focus-icon">✧</div>
        <div className="focus-copy">
          <label htmlFor="focus-input">FOCUS OF THE DAY</label>
          <input id="focus-input" value={focus} onChange={e => setFocus(e.target.value)} placeholder="What would make today a successful day?" />
        </div>
      </section>

      <section className="dashboard">
        <article className="panel timer-panel">
          <div className="panel-heading">
            <div><span className="heading-icon">◷</span><h2>Pomodoro Timer</h2></div>
            <span className="tiny-label">STAY IN THE MOMENT</span>
          </div>
          <div className="mode-tabs">
            <button className={mode === "Focus" ? "active" : ""} onClick={() => changeMode("Focus")}>Focus · 25 min</button>
            <button className={mode === "Break" ? "active" : ""} onClick={() => changeMode("Break")}>Short break · 5 min</button>
          </div>
          <div className="timer-wrap">
            <svg className="timer-ring" viewBox="0 0 250 250" role="img" aria-label={`${formatTime(seconds)} remaining`}>
              <circle className="ring-track" cx="125" cy="125" r="112" />
              <circle className="ring-progress" cx="125" cy="125" r="112" strokeDasharray={circumference} strokeDashoffset={offset} />
            </svg>
            <div className="timer-center"><strong>{formatTime(seconds)}</strong><span>{running ? "YOU'RE IN FLOW" : "READY WHEN YOU ARE"}</span></div>
          </div>
          <div className="timer-actions">
            <button className="primary round" onClick={() => { if (seconds === 0) setSeconds((mode === "Focus" ? 25 : 5) * 60); setRunning(!running); setNotice(""); }} aria-label={running ? "Pause timer" : "Start timer"}>{running ? "Ⅱ" : "▶"}</button>
            <button className="secondary round" onClick={() => { setRunning(false); setSeconds((mode === "Focus" ? 25 : 5) * 60); setNotice(""); }} aria-label="Reset timer">↻</button>
          </div>
          {notice && <p className="notice">{notice}</p>}
        </article>

        <article className="panel tasks-panel">
          <div className="panel-heading">
            <div><span className="heading-icon">▤</span><h2>Task List</h2></div>
            <span className="task-count">{completed}/{tasks.length}</span>
          </div>
          <div className="progress-line"><span style={{ width: `${progress}%` }} /></div>
          <div className="progress-caption"><span>{progress}% completed</span><span>{tasks.length - completed} left</span></div>
          <form className="add-task" onSubmit={addTask}>
            <input value={newTask} onChange={e => setNewTask(e.target.value)} placeholder="Add a new task..." aria-label="New task" />
            <button className="primary add-button" type="submit" aria-label="Add task">+</button>
          </form>
          <div className="task-list">
            {tasks.length === 0 && <p className="empty">No tasks yet. Add one to get started.</p>}
            {tasks.map(task => (
              <div className={`task-row ${task.done ? "done" : ""}`} key={task.id}>
                <button className={`check ${task.done ? "checked" : ""}`} onClick={() => toggleTask(task.id)} aria-label={task.done ? "Mark incomplete" : "Mark complete"}>{task.done ? "✓" : ""}</button>
                <span>{task.title}</span>
                <button className="delete-task" onClick={() => removeTask(task.id)} aria-label={`Delete ${task.title}`}>×</button>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="panel estimate-panel">
        <div className="panel-heading">
          <div><span className="heading-icon">ϟ</span><h2>Smart Task Estimator</h2></div>
          <span className="tiny-label">PLAN YOUR TIME</span>
        </div>
        <p className="estimate-intro">Describe a task and get a quick time estimate to help plan your day.</p>
        <label className="field-label" htmlFor="task-description">TASK DESCRIPTION</label>
        <textarea id="task-description" value={description} onChange={e => { setDescription(e.target.value); setEstimate(null); }} placeholder="e.g. Design a responsive landing page for a small business..." rows="3" />
        <div className="estimate-footer">
          <span className="privacy-note">Runs locally in your browser · No API key required</span>
          <button className="primary estimate-button" onClick={runEstimate} disabled={!description.trim()}>ϟ &nbsp; Estimate time</button>
        </div>
        {estimate && <div className="estimate-result"><div><span className="result-label">ESTIMATED TIME</span><strong>{estimate.minutes} minutes</strong></div><div><span className="result-label">CONFIDENCE</span><strong>{estimate.confidence}</strong></div><p>This is an approximate rule-based estimate, not a response from a generative AI model. Adjust it based on your experience and task complexity.</p></div>}
      </section>

      <footer><span className="brand small">Focus<span>Flow</span></span><span>Build a routine that works for you.</span><span>Made for mindful productivity ✦</span></footer>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
