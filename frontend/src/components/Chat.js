// プロジェクトごとにリアルタイムチャットを表示するコンポーネント
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Chat() {
    const { projectId } = useParams();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    let socket;

    useEffect(() => {
        socket = new WebSocket(`ws://localhost:8000/ws/chat/${projectId}/`);

        socket.onmessage = function (event) {
            const data = JSON.parse(event.data);
            setMessages(messages => [...messages, data.message]);
        };

        return () => {
            socket.close();
        };
    }, [projectId]);

    const sendMessage = () => {
        socket.send(JSON.stringify({ message }));
        setMessage('');
    };

    return (
        <div>
            <h1>Chat for Project {projectId}</h1>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' ? sendMessage() : null}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default Chat;
