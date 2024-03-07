import React from 'react'
import "./loading.css"

function Loading() {
    return (
        <div className="loading-container">
            <div className="loader"></div>
        </div>
    )
}

export default React.memo(Loading);
