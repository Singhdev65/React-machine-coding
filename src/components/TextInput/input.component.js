import React, { useCallback } from 'react';
import "./styles.css";

const TextInput = ({ value, onChange, placeholder = "Enter...." }) => {
    const handleChange = useCallback((e) => {
        onChange(e.target.value);
    }, [onChange]);

    return (
        <input
            type="text"
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            className='input'
        />
    );
};

export default TextInput;