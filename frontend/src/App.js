// react-router-dom: ルーティングを管理するために使用

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProjectList from './components/ProjectList';
import ProjectDetail from './components/ProjectDetail';
import TaskList from './components/TaskList';
import TaskDetail from './components/TaskDetail';
import Chat from './components/Chat';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<ProjectList />} />
                    <Route path="/projects/:id" element={<ProjectDetail />} />
                    <Route path="/tasks" element={<TaskList />} />
                    <Route path="/tasks/:id" element={<TaskDetail />} />
                    <Route path="/chat/:projectId" element={<Chat />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
