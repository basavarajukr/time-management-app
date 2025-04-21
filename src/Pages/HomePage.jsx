import React, { useState, useContext, useEffect } from "react";
import { TimerContext } from "../Context/TimerContext";
import { ThemeContext } from "../Context/ThemeContext";
import TimerForm from "../Components/TimerForm";
import TimerList from "../Components/TimerList";

const HomePage = () => {
  const { state } = useContext(TimerContext);
  const { timers } = state;

  const { theme, toggleTheme } = useContext(ThemeContext);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const uniqueCategories = [...new Set(timers.map((t) => t.category))];

  const filteredTimers =
    selectedCategory === "All"
      ? timers
      : timers.filter((t) => t.category === selectedCategory);

  return (
    <div className="home-page" style={styles.homePage}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Timer Management</h1>
        <button onClick={toggleTheme} style={styles.button}>
          {theme === "light" ? "Dark" : "Light"}
        </button>
      </div>

      <TimerForm />

      <div className="filter-section" style={styles.filterSection}>
        <label htmlFor="categoryFilter" style={styles.label}>
          Filter by Category:
        </label>
        <select
          id="categoryFilter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={styles.select}
        >
          <option value="All">All</option>
          {uniqueCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="timer-list">
        {timers.length === 0 ? (
          <p>No timers available. Add a timer to get started.</p>
        ) : (
          <TimerList timers={filteredTimers} />
        )}
      </div>
    </div>
  );
};

const styles = {
  button: {
    padding: "0.6rem 1rem",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    float: "right",
    marginLeft: "50px",
  },
  filterSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    margin: "20px 0",
    padding: "10px 15px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    border: "1px solid #ddd",
    maxWidth: "400px",
    width: "100%",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
  },
  label: {
    fontWeight: 600,
    fontSize: "14px",
    color: "#333",
  },
  select: {
    padding: "6px 10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
    cursor: "pointer",
    flexGrow: 1,
    backgroundColor: "#f9f9f9",
    color: "#333",
  },
  homePage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};

export default HomePage;
