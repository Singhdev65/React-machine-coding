import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export default function Project({ projects }) {
    const { projectId } = useParams();
    const navigate = useNavigate()
    const project = projects.find(p => p.id === projectId);
    if (!project) {
        return navigate("/")
    }
    const ProjectComponent = project.component;
    return (
        <div className="container">
            <ProjectComponent />
        </div>
    );
}
