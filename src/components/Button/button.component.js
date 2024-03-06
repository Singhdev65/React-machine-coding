import React, { useCallback } from 'react';
import "./button.css";

function Button({ text, onClick, customStyle = "", id }) {
    const handleClick = useCallback((evt) => {
        if (typeof onClick === 'function') {
            if (id !== undefined) {
                onClick(id);
            } else {
                onClick();
            }
        }
    }, [onClick, id]);

    return (
        <button type='submit' className={`btn ${customStyle}`} onClick={handleClick}>
            {text}
        </button>
    );
}

export default React.memo(Button);