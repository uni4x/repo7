import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ProgressChart({ tasks }) {
    const totalTasks = tasks.length;
    const statusCounts = {
        todo: 0,
        in_progress: 0,
        done: 0,
    };

    tasks.forEach(task => {
        statusCounts[task.status]++;
    });

    const barData = {
        labels: ['To Do', 'In Progress', 'Done'],
        datasets: [
            {
                label: 'Tasks (%)',
                backgroundColor: ['#f39c12', '#3498db', '#2ecc71'],
                data: [
                    (statusCounts.todo / totalTasks) * 100,
                    (statusCounts.in_progress / totalTasks) * 100,
                    (statusCounts.done / totalTasks) * 100
                ],
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 20,
                }
            }
        },
        plugins: {
            title: {
                display: true,  // タイトルを表示
                text: 'Task Progress',  // 表示するタイトルのテキスト
                font: {
                    size: 18  // タイトルのフォントサイズ
                }
            },
            legend: {
                display: true,
                position: 'top',
            },
        },
        maintainAspectRatio: false,
    };

    return (
        <div style={{ width: '100%', height: '400px' }}>
            <Bar data={barData} options={options} />
        </div>
    );
}

export default ProgressChart;