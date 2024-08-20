import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProject, updateProject, deleteProject } from '../services/api';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import ProgressChart from './ProgressChart';
import TaskCalendar from './TaskCalendar';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function ProgressBar({ completed, total }) {
    const percentage = (completed / total) * 100;

    return (
        <div className="my-4">
            <h3>Project Completion</h3>
            <div className="progress" style={{ height: '20px' }}>
                <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: `${percentage}%` }}
                    aria-valuenow={percentage}
                    aria-valuemin="0"
                    aria-valuemax="100"
                />
            </div>
            <p className="mt-2">{Math.round(percentage)}% Completed</p>
        </div>
    );
}

function ProjectDetail() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        getProject(id).then(response => {
            setProject(response.data);
            setTasks(response.data.tasks);
        });
    }, [id]);

    if (!project) return <div>Loading...</div>;

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedProject = await updateProject(id, project);
            setProject(updatedProject.data);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating project:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteProject(id);
            window.location.href = "/";
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    const handleTaskCreated = (newTask) => {
        setTasks([...tasks, newTask]);
    };

    const statusCounts = tasks.reduce((counts, task) => {
        counts[task.status] = (counts[task.status] || 0) + 1;
        return counts;
    }, {});

    const totalTasks = tasks.length;

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">{project.name}</h1>
            <p className="text-center mb-4">{project.description}</p>

            <div className="d-flex justify-content-center mb-4">
                <button
                    className="btn btn-outline-primary me-2"
                    onClick={() => setIsEditing(!isEditing)}
                >
                    {isEditing ? 'Cancel' : 'Edit Project'}
                </button>
                <button className="btn btn-outline-danger" onClick={handleDelete}>
                    Delete Project
                </button>
            </div>

            {isEditing && (
                <form onSubmit={handleEditSubmit} className="mb-4">
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            value={project.name}
                            onChange={(e) => setProject({ ...project, name: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            className="form-control"
                            value={project.description}
                            onChange={(e) => setProject({ ...project, description: e.target.value })}
                        />
                    </div>
                    <button type="submit" className="btn btn-success">
                        Save Changes
                    </button>
                </form>
            )}

            <ProgressBar completed={statusCounts.done || 0} total={totalTasks} />

            <div className="row">
                <div className="col-md-6">
                    <TaskCalendar tasks={tasks} />
                </div>
                <div className="col-md-6">
                    <ProgressChart tasks={tasks} />
                </div>
            </div>

            <div className="mt-4">
                <TaskForm projectId={id} onTaskCreated={handleTaskCreated} />
                <TaskList tasks={tasks} setTasks={setTasks} />
            </div>

            {/* プロジェクトリストに戻るリンクを追加 */}
            <div className="text-center mt-4">
                <Link to="/" className="btn btn-secondary mb-4">
                    Back to Projects
                </Link>
            </div>
        </div>
    );
}

export default ProjectDetail;