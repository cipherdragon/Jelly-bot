import React from 'react';
import './App.css';
// import { render } from '@testing-library/react';

let messages = [
    {
        "id" : 1,
        "sender" : "Alice",
        "message" : "Hi!"
    },
    {
        "id" : 2,
        "sender" : "Alice",
        "message" : "Hi there!"
    },
    {
        "id" : 3,
        "sender" : "Bob",
        "message" : "Hi!"
    },
    {
        "id" : 4,
        "sender" : "Bot",
        "message" : "I'm the bot!"
    },
    {
        "id" : 5,
        "sender" : "Bob",
        "message" : "Again Bob here! this is a long long long long and loooonnng message. Let's see how my css render this."
    }
    ,
    {
        "id" : 6,
        "sender" : "Bot",
        "message" : "It is super bad. Add max-width for message and reduce font size too."
    }
]

const current_name = "Bob";

function App() {
    return (
        <div className="App">
            <ChatRoom />
            <MessageBox />
        </div>
    );
}

function MessageBox() {
    return(
        <form name="new-message" className="new-message">
            <input type="text" className="message-box"></input>
            <button type="submit" className="send-button">
                <span role="img" aria-label="rocket">
                    🚀
                </span>
            </button>
        </form>
    )
}

function ChatRoom() {
    return(
        <div className="ChatRoom">
            {messages.map((msg) => {
                return <ChatMessage message={msg} key={msg.id}/>
            })}
        </div>
    )
}

function ChatMessage(props) {
    const { sender, message} = props.message;
    const messageClass = sender === current_name ? "sent" : "received";

    return(
        <div className="message-wrapper">
            <div className={`message ${messageClass}`}>
                <div className="sender">{sender}</div>
                <div className="message-text">{message}</div>
            </div>
        </div>   
    )
}


export default App;
