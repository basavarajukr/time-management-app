import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { TimerContext } from "../Context/TimerContext";
import Modal from "./Modal";

const TimerItem = ({ timer }) => {
  const { dispatch } = useContext(TimerContext);
  const [currentTimer, setCurrentTimer] = useState(timer);
  const [showModal, setShowModal] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    setCurrentTimer(timer);
  }, [timer]);

  useEffect(() => {
    if (currentTimer.status === "running" && intervalRef.current === null) {
      startCountdown();
    } else if (
      currentTimer.status !== "running" &&
      intervalRef.current !== null
    ) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => clearInterval(intervalRef.current);
  }, [currentTimer.status]);

  const startCountdown = () => {
    intervalRef.current = setInterval(() => {
      setCurrentTimer((prev) => {
        if (prev.remaining <= 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;

          setTimeout(() => {
            dispatch({ type: "COMPLETE_TIMER", payload: prev.id });
            setShowModal(true);
          }, 0);

          return { ...prev, remaining: 0, status: "completed" };
        }

        const updatedRemaining = prev.remaining - 1;

        if (
          prev.halfwayAlert &&
          updatedRemaining === Math.floor(prev.duration / 2)
        ) {
          alert(
            `Halfway there! Timer "${prev.name}" has reached 50% of its duration.`
          );
        }

        setTimeout(() => {
          dispatch({
            type: "UPDATE_TIMER",
            payload: {
              id: prev.id,
              data: { remaining: updatedRemaining, status: "running" },
            },
          });
        }, 0);

        return { ...prev, remaining: updatedRemaining };
      });
    }, 1000);
  };

  const handleStart = () => {
    dispatch({
      type: "UPDATE_TIMER",
      payload: {
        id: currentTimer.id,
        data: { status: "running" },
      },
    });
  };

  const handlePause = () => {
    dispatch({
      type: "UPDATE_TIMER",
      payload: {
        id: currentTimer.id,
        data: { status: "paused" },
      },
    });
  };

  const handleReset = () => {
    dispatch({
      type: "UPDATE_TIMER",
      payload: {
        id: currentTimer.id,
        data: {
          status: "idle",
          remaining: currentTimer.duration,
        },
      },
    });
  };

  const handleComplete = () => {
    dispatch({ type: "COMPLETE_TIMER", payload: currentTimer.id });
    setShowModal(true);
  };

  return (
    <div className="timer-item">
      <h3>{currentTimer.name}</h3>
      <p>Category: {currentTimer.category}</p>
      <p>Remaining Time: {currentTimer.remaining}s</p>
      <p>Status: {currentTimer.status}</p>

      <progress
        value={currentTimer.duration - currentTimer.remaining}
        max={currentTimer.duration}
      ></progress>

      <div className="timer-controls">
        {currentTimer.status === "idle" && (
          <button onClick={handleStart}>Start</button>
        )}
        {currentTimer.status === "running" && (
          <button onClick={handlePause}>Pause</button>
        )}
        {currentTimer.status === "paused" && (
          <button onClick={handleStart}>Resume</button>
        )}
        {(currentTimer.status === "running" ||
          currentTimer.status === "paused") && (
          <button onClick={handleReset}>Reset</button>
        )}
        {currentTimer.status !== "completed" && (
          <button onClick={handleComplete}>Complete</button>
        )}
      </div>

      {currentTimer.status === "completed" && (
        <div className="completed-message">
          Timer <strong>{currentTimer.name}</strong> is complete!
        </div>
      )}

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        message={`Timer "${currentTimer.name}" has completed!`}
      />
    </div>
  );
};

const styles = {
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

export default TimerItem;
