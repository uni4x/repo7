// TaskList.js

import React, { useState } from 'react';
import { updateTask, deleteTask } from '../services/api';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import 'bootstrap/dist/css/bootstrap.min.css';

function TaskList({ tasks, setTasks }) {
    const [editingTask, setEditingTask] = useState(null);

    const handleEditSubmit = async (e, taskId) => {
        e.preventDefault();
        try {
            const updatedTask = await updateTask(taskId, editingTask);
            setTasks(tasks.map(task => task.id === taskId ? updatedTask.data : task));
            setEditingTask(null);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleDelete = async (taskId) => {
        try {
            await deleteTask(taskId);
            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const getCardClassName = (status) => {
        switch (status) {
            case 'todo':
                return 'border-warning';
            case 'in_progress':
                return 'border-info';
            case 'done':
                return 'border-success';
            default:
                return '';
        }
    };

    return (
        <div className="row">
            {tasks.map(task => (
                <div className="col-md-4 mb-4" key={task.id}>
                    <div className={`card ${getCardClassName(task.status)}`}>
                        <div className="card-body">
                            {editingTask && editingTask.id === task.id ? (
                                <form onSubmit={(e) => handleEditSubmit(e, task.id)}>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={editingTask.title}
                                            onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <textarea
                                            className="form-control"
                                            value={editingTask.description}
                                            onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <select
                                            className="form-control"
                                            value={editingTask.status}
                                            onChange={(e) => setEditingTask({ ...editingTask, status: e.target.value })}
                                        >
                                            <option value="todo">To Do</option>
                                            <option value="in_progress">In Progress</option>
                                            <option value="done">Done</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <select
                                            className="form-control"
                                            value={editingTask.priority}
                                            onChange={(e) => setEditingTask({ ...editingTask, priority: parseInt(e.target.value) })}
                                        >
                                            <option value={1}>High</option>
                                            <option value={2}>Medium</option>
                                            <option value={3}>Low</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={editingTask.deadline}
                                            onChange={(e) => setEditingTask({ ...editingTask, deadline: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={editingTask.order}
                                            onChange={(e) => setEditingTask({ ...editingTask, order: parseInt(e.target.value) })}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-success btn-block">Save</button>
                                    <button type="button" className="btn btn-secondary btn-block" onClick={() => setEditingTask(null)}>Cancel</button>
                                </form>
                            ) : (
                                <>
                                    <h5 className="card-title">{task.title}</h5>
                                    <p className="card-text">{task.description || 'No description'}</p>
                                    <p className="card-text"><strong>Priority:</strong> {task.priority === 1 ? 'High' : task.priority === 2 ? 'Medium' : 'Low'}</p>
                                    <p className="card-text"><strong>Order:</strong> {task.order}</p>
                                    <p className="card-text"><strong>Deadline:</strong> {task.deadline}</p>
                                    <p className="card-text"><strong>Status:</strong> {task.status}</p>
                                    <button className="btn btn-outline-primary me-2" onClick={() => setEditingTask(task)}>
                                        <EditIcon /> Edit
                                    </button>
                                    <button className="btn btn-outline-danger" onClick={() => handleDelete(task.id)}>
                                        <DeleteIcon /> Delete
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TaskList;