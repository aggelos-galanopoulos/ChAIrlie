import React, { useState } from "react";
import axios from "axios";
import "./ChatPage.css"; // Ensure you have your CSS file imported


function ChatPage() {
    const [userInput, setUserInput] = useState("");
    const [userMessages, setUserMessages] = useState([]);
    const [assistantMessages, setAssistantMessages] = useState([]);

    function handleUserInput(e) {
        setUserInput(e.target.value);
    }

    async function sendMessage() {
        const userMessage = userInput.trim();
        if (!userMessage) return;

        setUserMessages(prev => [...prev, userMessage]);
        setUserInput("");

        try {
            const response = await axios.post('http://localhost:3002/chat', {
                messages: [{ role: 'user', content: userMessage }],
            });
            console.log(response.data);
            const assistantMessage = response.data.choices[0].message.content;
            setAssistantMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    }

    return (
        <div className="container">
            <div className="chatHeader">
                <h1 className="chairlieName">chAIrlie</h1>
            </div>
            <div className="chatDisplay">
                {userMessages.map((message, index) => (
                    <div key={index} className="message">
                        <p className="userMessage">{message}</p>
                        {assistantMessages[index] && (
                            <p className="assistantMessage">{assistantMessages[index]}</p>
                        )}
                    </div>
                ))}
            </div>
            <div className="chatInput">
                <input
                    type="text"
                    value={userInput}
                    onChange={handleUserInput}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask me anything..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default ChatPage;