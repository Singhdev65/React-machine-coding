import React from 'react';
import './styles.css';

function Nofound() {
    return (
        <div className="not-found-container">
            <div className="not-found-animation"></div>
            <div className="not-found-text">
                <h1>404 - Not Found</h1>
                <p>The page you are looking for does not exist.</p>
            </div>
        </div>
    );
};

export default Nofound;