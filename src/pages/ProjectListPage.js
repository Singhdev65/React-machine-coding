import React from "react";
import { Link } from "react-router-dom";

export default function ProjectsListPage({ projects = [] }) {
  return (
    <div className="projects-container">
      <h1 className="projects-title">🚀 Welcome to Our Projects</h1>
      <div className="project-list">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <h2 className="project-title">{project.title}</h2>
            <p className="project-description">{project.description}</p>
            <Link to={project.path} className="view-button">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
