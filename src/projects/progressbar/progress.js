import React, { useEffect, useState } from "react";
import "./progressBar.css";

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const clampedValue = Math.min(100, Math.max(0, progress));

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 10 : 100));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#000",
        height: "100vh",
        padding: "40px",
        color: "#fff",
      }}
    >
      <h1> Progress Bar</h1>
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${clampedValue}%` }} />
        <span className="progress-label">{clampedValue}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;
