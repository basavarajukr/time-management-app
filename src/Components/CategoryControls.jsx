import React from "react";
import { useContext } from "react";
import { TimerContext } from "../Context/TimerContext";

const CategoryControl = ({ category }) => {
  const { dispatch } = useContext(TimerContext);

  const handleBulkAction = (actionType) => {
    dispatch({
      type: "BULK_ACTION",
      payload: { actionType, category },
    });
  };

  return (
    <div className="category-controls">
      <button onClick={() => handleBulkAction("START")}>Start All</button>
      <button onClick={() => handleBulkAction("PAUSE")}>Pause All</button>
      <button onClick={() => handleBulkAction("RESET")}>Reset All</button>
    </div>
  );
};

export default CategoryControl;
