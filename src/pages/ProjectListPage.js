import React from 'react'
import { Link } from 'react-router-dom'

export default function ProjectsListPage({ projects = [] }) {
    return (
        <div className="container">
            <h1>Welcome to Our Projects</h1>
            <div className="project-list">
                {projects.map(project => (
                    <div key={project.id} className="project-card">
                        <h2>{project.title}</h2>
                        <p>{project.description}</p>
                        <Link to={project.path} className="btn">
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
