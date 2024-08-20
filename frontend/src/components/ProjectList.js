import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProjects } from '../services/api';
import ProjectForm from './ProjectForm';

function ProjectList() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        const response = await getProjects();
        setProjects(response.data);
    };

    const handleProjectCreated = (newProject) => {
        setProjects([...projects, newProject]);
    };

    return (
        <div className="container">
            <h1 className="mb-4">Projects</h1>
            <ProjectForm onProjectCreated={handleProjectCreated} />
            <ul className="list-group">
                {projects.map(project => (
                    <li key={project.id} className="list-group-item">
                        <Link to={`/projects/${project.id}`}>{project.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProjectList;