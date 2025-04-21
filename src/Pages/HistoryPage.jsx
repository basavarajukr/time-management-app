import { useContext } from "react";
import { TimerContext } from "../Context/TimerContext";

const HistoryPage = () => {
  const { state } = useContext(TimerContext);
  const { history } = state;

  const handleExport = () => {
    const historyData = JSON.stringify(state.history, null, 2);
    const blob = new Blob([historyData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `timer-history-${new Date().toISOString()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h2>Timer History</h2>
      <button onClick={handleExport} style={styles.button}>
        Export History
      </button>
      {history.length === 0 ? (
        <p>No completed timers yet!</p>
      ) : (
        <ul>
          {history.map((entry, index) => (
            <li key={index} style={{ marginBottom: "1rem" }}>
              <strong>{entry.name}</strong> - Completed at{" "}
              {entry.completionTime}
            </li>
          ))}
        </ul>
      )}
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
    marginRight: "50px",
  },
};

export default HistoryPage;
