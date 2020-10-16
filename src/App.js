// author: Adeepa Gunathilake

import React, { useRef } from 'react';
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

let localMessageCache = [
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

function ChatMessageDisplay(props) {
    const [messages, setMessages] = useState();

    const onMessagesChanged = () => {
        // TODO : Write the logic to update component when local message cache changed.
        // Change local message cache when new messages arrived from server. 
        // Update the component by updating the messages state.

        setMessages(localMessageCache);
    }

    const dummy = useRef(null);

    setTimeout(() => dummy.current && dummy.current.scrollIntoView({ behavior: 'smooth' }), 50);

    return(
        <div className="ChatMessageDisplay">
            {messages && messages.map(msg =>  <ChatMessage message={msg} key={msg.id}/>)}
            <span ref={dummy}></span>
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

// ============================================================================
// ============================= Utility Functions ============================
// ============================================================================

function getNewMessages() {
    // TODO : update local message cache listening to the server. 
}

export default App;
