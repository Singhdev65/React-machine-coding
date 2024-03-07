import React, { useReducer, useCallback } from 'react';
import Button from '../../components/Button';
import './counter.css';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'decrement':
      return { count: Math.max(0, state.count - 1) };
    case 'increment':
      return { count: state.count + 1 };
    default:
      throw new Error('Unknown action.');
  }
}

const Counter = React.memo(() => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleClick = useCallback((type) => {
    if (type === 'increment') {
      dispatch({ type: 'increment' });
    } else if (type === 'decrement') {
      dispatch({ type: 'decrement' });
    }
  }, []);

  const counterHeading = (
    <h1 className="counter-heading">
      {Array.from("CounterApp").map((char, index) => (
        <span key={index} style={{ color: index % 2 === 0 ? 'brown' : 'red' }}>{char}</span>
      ))}
    </h1>
  );

  return (
    <div className='counter-container'>
      {counterHeading}
      <div className='horizontal-center'>
        <Button type="decrement" text="-" onClick={() => handleClick('decrement')} />
        <span className="counter-value">{state.count}</span>
        <Button text="+" onClick={() => handleClick('increment')} />
      </div>
    </div>
  );
});

export default Counter;
