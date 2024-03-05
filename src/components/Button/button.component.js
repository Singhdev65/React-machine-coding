import React, { useCallback } from 'react'
import "./button.css"

function Button({ text, type, handleClick }) {
    const onClick = useCallback(() => {
        handleClick(type);
    }, [handleClick, type]);

    return (
        <button type="button" className="btn" onClick={onClick}>
            {text}
        </button>
    );
}

export default React.memo(Button);
