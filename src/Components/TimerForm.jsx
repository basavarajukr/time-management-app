import { useState, useContext } from "react";
import { TimerContext } from "../Context/TimerContext";

const TimerForm = () => {
  const { dispatch } = useContext(TimerContext);

  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("");
  const [halfwayAlert, setHalfwayAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !duration || !category || isNaN(duration)) {
      alert("Please fill all fields correctly.");
      return;
    }

    const newTimer = {
      id: Date.now(),
      name,
      duration: parseInt(duration),
      remaining: parseInt(duration),
      category,
      status: "idle",
      createdAt: new Date().toISOString(),
      halfwayAlert,
    };

    dispatch({ type: "ADD_TIMER", payload: newTimer });

    setName("");
    setDuration("");
    setCategory("");
    setHalfwayAlert(false);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3>Create a Timer</h3>

      <input
        type="text"
        placeholder="Timer Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
      />

      <input
        type="number"
        placeholder="Duration (seconds)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        style={styles.input}
      />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={styles.input}
      />

      <label>
        <input
          type="checkbox"
          checked={halfwayAlert}
          onChange={(e) => setHalfwayAlert(e.target.checked)}
        />
        Enable Halfway Alert
      </label>

      <button type="submit" style={styles.button}>
        Add Timer
      </button>
    </form>
  );
};

const styles = {
  form: {
    marginBottom: "2rem",
    border: "1px solid #ccc",
    padding: "1rem",
    borderRadius: "8px",
    width: "100%",
    maxWidth: "400px",
  },
  input: {
    display: "block",
    width: "90%",
    padding: "0.5rem",
    marginBottom: "1rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    padding: "0.6rem 1rem",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    float: "right",
  },
};

export default TimerForm;
