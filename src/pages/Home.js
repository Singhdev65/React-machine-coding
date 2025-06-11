import React from "react";
import profileImg from "./profile.png";

export default function Home() {
  return (
    <div className="app">
      <main className="hero">
        <div className="content">
          <p className="greeting">Hello !!!</p>
          <h1>
            I'm <span>Prince Kumar</span>
          </h1>
          <p className="subtitle">MERN STACK DEVELOPER</p>
          <p className="description">
            🚀 MERN maestro blending code with creativity. I build scalable apps
            with React, Node.js, and GPT-4, crafting fast, AI-driven
            experiences. From Fortune 500 success to sleek personal projects, I
            turn complex ideas into intuitive UIs. Agile, atomic, and always
            evolving—tech that speaks human. Let’s build the future, today.
          </p>
        </div>
        <img src={profileImg} alt="profile" className="profile-img" />
      </main>
    </div>
  );
}
