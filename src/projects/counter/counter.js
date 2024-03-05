import React, { useReducer } from 'react'
import { Button } from '../../components'

export default function Counter() {

  function reducer(state, action) {
    switch (action.type) {
      case "decrement":
        return {
          count: state.count == 0 ? 0 : state.count - 1
        };
      case "increment":
        return {
          count: state.count + 1
        };
      default:
        throw Error('Unknown action.')
    }
  }

  const [state, dispatch] = useReducer(reducer, { count: 0 });

  const handleClick = (type) => dispatch({ type })

  return (
    <>
      <Button type='decrement' text="-" handleClick={() => handleClick('decrement')} />
      {state.count}
      <Button text="+" handleClick={() => handleClick("increment")} />
    </>
  )
}
