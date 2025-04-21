import React, { useState, useContext } from "react";
import { TimerContext } from "../Context/TimerContext";
import TimerItem from "./TimerItem";

const TimerList = ({ timers }) => {
  const [expandedCategories, setExpandedCategories] = useState({});
  const { dispatch } = useContext(TimerContext);

  const groupedTimers = timers.reduce((acc, timer) => {
    if (!acc[timer.category]) {
      acc[timer.category] = [];
    }
    acc[timer.category].push(timer);
    return acc;
  }, {});

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleBulkAction = (category, actionType) => {
    dispatch({
      type: "BULK_ACTION",
      payload: { category, actionType },
    });
  };

  return (
    <div>
      {Object.keys(groupedTimers).map((category) => (
        <div
          key={category}
          className="category-block"
          style={styles.categoryBlock}
        >
          <div
            className="category-header"
            onClick={() => toggleCategory(category)}
            style={styles.categoryHeader}
          >
            <h3 style={styles.categoryTitle}>
              {category} ({groupedTimers[category].length} Timers)
            </h3>
          </div>

          {expandedCategories[category] && (
            <div className="bulk-buttons">
              <button onClick={() => handleBulkAction(category, "START")}>
                Start All
              </button>
              <button onClick={() => handleBulkAction(category, "PAUSE")}>
                Pause All
              </button>
              <button onClick={() => handleBulkAction(category, "RESET")}>
                Reset All
              </button>
            </div>
          )}

          {expandedCategories[category] && (
            <div className="timer-list" style={styles.timerList}>
              {groupedTimers[category].map((timer) => (
                <TimerItem key={timer.id} timer={timer} dispatch={dispatch} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const styles = {
  timerList: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    marginTop: "2rem",
    padding: "1rem",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
  },
  categoryBlock: {
    backgroundColor: "#ffffff",
    padding: "1rem",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
    border: "1px solid #ddd",
  },
  categoryHeader: {
    borderBottom: "1px solid #eee",
    paddingBottom: "0.5rem",
    marginBottom: "1rem",
  },
  categoryTitle: {
    fontSize: "18px",
    color: "#333",
    margin: 0,
  },
};

export default TimerList;
