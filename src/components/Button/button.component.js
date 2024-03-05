import React from 'react'
import "./button.css"

export default function Button({ text = "+", type = "increment", handleClick = () => null }) {
    return (
        <button type="button" className='btn' onClick={handleClick}>{text}</button>
    )
}
