import React, { useState } from 'react';
import { createProject } from '../services/api';

function ProjectForm({ onProjectCreated }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newProject = { name, description };
        try {
            const response = await createProject(newProject);
            onProjectCreated(response.data); // 新しいプロジェクトが作成されたことを親コンポーネントに通知
            setName(''); // フォームをリセット
            setDescription('');
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="form-group">
                <label htmlFor="projectName">Project Name:</label>
                <input
                    type="text"
                    id="projectName"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-primary mt-4">Create Project</button>
        </form>
    );
}

export default ProjectForm;