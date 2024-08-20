import React, { useState } from 'react';
import { createTask } from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';

function TaskForm({ projectId, onTaskCreated }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('todo');
    const [priority, setPriority] = useState(2);
    const [deadline, setDeadline] = useState('');
    const [order, setOrder] = useState(1);  // 新しい順位フィールド

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTask = {
            title,
            description,
            status,
            priority,
            deadline,
            project: projectId,
            order,  // 順位フィールドを追加
        };

        try {
            const response = await createTask(newTask);
            onTaskCreated(response.data);
            setTitle('');
            setDescription('');
            setStatus('todo');
            setPriority(2);
            setDeadline('');
            setOrder(1);
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="form-group">
                <label htmlFor="title">Task Title</label>
                <input
                    type="text"
                    id="title"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                    id="status"
                    className="form-control"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="todo">To Do</option>
                    <option value="in_progress">In Progress</option>
                    <option value="done">Done</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="priority">Priority</label>
                <select
                    id="priority"
                    className="form-control"
                    value={priority}
                    onChange={(e) => setPriority(parseInt(e.target.value))}
                >
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="deadline">Deadline</label>
                <input
                    type="date"
                    id="deadline"
                    className="form-control"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="order">Order</label>
                <input
                    type="number"
                    id="order"
                    className="form-control"
                    value={order}
                    onChange={(e) => setOrder(parseInt(e.target.value))}
                />
            </div>

            <button type="submit" className="btn btn-success btn-block  mt-3">Create Task</button>
        </form>
    );
}

export default TaskForm;