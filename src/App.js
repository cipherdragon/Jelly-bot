// author: Adeepa Gunathilake

import React from 'react';
import './App.css';
import { useState } from "react";

// currentUser object contains data about the user who use this react app in the
// browser currently. Name is hardcoded currently.
const currentUser = {
    name: 'Bob',
    uid : () => {
        // TODO : Write the logic to generate a user id. 
        // I prefer using firebase().auth().currentUser.uid but this project isn't using firebase.
        // So have to do a workaround.
        return Math.random() * 1000;
    }
}

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

function App() {
    return (
        <div className="App">
            <ChatMessageDisplay />
            <NewMessageBox />
        </div>
    );
}

function NewMessageBox() {
    const [newMessage, setNewMessage] = useState('');

    const sendNewMessage = async (e) => {
        e.preventDefault();

        if(newMessage === '') return;

        // TODO : Write the logic to send new message to the server (messageDB)
        
        setNewMessage('');
    }

    return(
        <form name="new-message" className="new-message" onSubmit={sendNewMessage}>
            <input type="text" value={newMessage} className="message-box" onChange={(e) => setNewMessage(e.target.value)}></input>
            <button type="submit" className="send-button">
                <span role="img" aria-label="rocket">
                    🚀
                </span>
            </button>
        </form>
    )
}

function ChatMessageDisplay() {
    return(
        <div className="ChatMessageDisplay">
            {messages.map((msg) => {
                return <ChatMessage message={msg} key={msg.id}/>
            })}
        </div>
    )
}

function ChatMessage(props) {
    const { name, text, uid} = props.message;
    const messageClass = uid === currentUser.uid ? "sent" : "received";
    
    return(
        <div className="message-wrapper">
            <div className={`message ${messageClass}`}>
                <div className="sender">{name}</div>
                <div className="message-text">{text}</div>
            </div>
        </div>   
    );
}

export default App;
