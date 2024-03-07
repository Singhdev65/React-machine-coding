import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Counter, Todo, Weather } from "./projects";
import "./app.css"
import Layout from "./layout";
import Home from "./pages/Home";
import ProjectsListPage from "./pages/ProjectListPage";
import Project from "./pages/Project";
import Nofound from "./pages/Not";

const projects = [
    {
        id: "1",
        title: "Counter",
        description: "A simple counter project",
        path: "/projects/1",
        component: Counter
    }, {
        id: "2",
        title: "Todo",
        description: "A todo list project",
        path: "/projects/2",
        component: Todo
    }, {
        id: "3",
        title: "Weather",
        description: "A weather forecast project",
        path: "/projects/3",
        component: Weather
    },
];

const App = () => (
    <Layout>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectsListPage projects={projects} />} />
            {projects.map(project => (
                <Route key={project.id} path={`/projects/:projectId`} element={<Project projects={projects} />} />
            ))}
            <Route path="*" element={<Nofound />} />
        </Routes>
    </Layout>
);

export default App;
