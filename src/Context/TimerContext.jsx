import { createContext, useReducer } from "react";

export const TimerContext = createContext();

const localTimers = JSON.parse(localStorage.getItem("timers")) || [];
const localHistory = JSON.parse(localStorage.getItem("history")) || [];

const initialState = {
  timers: localTimers,
  history: localHistory,
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TIMER":
      const updatedTimers = [...state.timers, action.payload];
      localStorage.setItem("timers", JSON.stringify(updatedTimers));
      return { ...state, timers: updatedTimers };

    case "UPDATE_TIMER":
      const timersUpdated = state.timers.map((timer) =>
        timer.id === action.payload.id
          ? { ...timer, ...action.payload.data }
          : timer
      );
      localStorage.setItem("timers", JSON.stringify(timersUpdated));
      return { ...state, timers: timersUpdated };

    case "COMPLETE_TIMER":
      const completedTimer = state.timers.map((timer) =>
        timer.id === action.payload ? { ...timer, status: "completed" } : timer
      );

      const completionTime = new Date().toLocaleString();
      const updatedHistory = [
        ...state.history,
        {
          name: completedTimer.find((timer) => timer.id === action.payload)
            .name,
          completionTime,
        },
      ];

      localStorage.setItem("timers", JSON.stringify(completedTimer));
      localStorage.setItem("history", JSON.stringify(updatedHistory));

      return { ...state, timers: completedTimer, history: updatedHistory };

    case "RESET_TIMER":
      const resetTimers = state.timers.map((timer) =>
        timer.id === action.payload
          ? { ...timer, remaining: timer.duration, status: "idle" }
          : timer
      );
      localStorage.setItem("timers", JSON.stringify(resetTimers));
      return { ...state, timers: resetTimers };

    case "BULK_ACTION":
      const { actionType, category } = action.payload;
      const updatedTimersBulk = state.timers.map((timer) => {
        if (timer.category === category) {
          switch (actionType) {
            case "START":
              return { ...timer, status: "running" };
            case "PAUSE":
              return { ...timer, status: "paused" };
            case "RESET":
              return { ...timer, remaining: timer.duration, status: "idle" };
            default:
              return timer;
          }
        }
        return timer;
      });
      localStorage.setItem("timers", JSON.stringify(updatedTimersBulk));
      return { ...state, timers: updatedTimersBulk };

    default:
      return state;
  }
}

export const TimerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TimerContext.Provider value={{ state, dispatch }}>
      {children}
    </TimerContext.Provider>
  );
};
