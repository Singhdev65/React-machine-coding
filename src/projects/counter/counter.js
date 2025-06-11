import React, { useReducer, useCallback } from "react";
import Button from "../../components/Button";
import "./counter.css";

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "decrement":
      return { count: Math.max(0, state.count - 1) };
    case "increment":
      return { count: state.count + 1 };
    default:
      throw new Error("Unknown action.");
  }
}

const Counter = React.memo(() => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleClick = useCallback((type) => {
    dispatch({ type });
  }, []);

  const counterHeading = (
    <h1 className="counter-heading">
      {Array.from("CounterApp").map((char, index) => (
        <span
          key={index}
          className="heading-char"
          style={{ color: index % 2 === 0 ? "#0af" : "#f04" }}
        >
          {char}
        </span>
      ))}
    </h1>
  );

  return (
    <div className="counter-container">
      {counterHeading}
      <div className="counter-controls">
        <Button
          type="decrement"
          text="−"
          onClick={() => handleClick("decrement")}
        />
        <span className="counter-value">{state.count}</span>
        <Button
          type="increment"
          text="+"
          onClick={() => handleClick("increment")}
        />
      </div>
    </div>
  );
});

export default Counter;
