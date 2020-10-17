// author: Adeepa Gunathilake

import React, { useRef } from 'react';
import './App.css';
import { useState } from "react";
import { Subject } from "rxjs";

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
        "uid" : 1,
        "name" : "Alice",
        "text" : "Hi!"
    },
    {
        "uid" : 2,
        "name" : "Alice",
        "text" : "Hi there!"
    },
    {
        "uid" : currentUser.uid,
        "name" : "Bob",
        "text" : "Hi!"
    },
    {
        "uid" : 4,
        "name" : "Bot",
        "text" : "I'm the bot!"
    },
    {
        "uid" : currentUser.uid,
        "name" : "Bob",
        "text" : "Again Bob here! this is a long long long long and loooonnng message. Let's see how my css render this."
    }
    ,
    {
        "uid" : 6,
        "name" : "Bot",
        "text" : "It is super bad. Add max-width for message and reduce font size too."
    }
]

const messageCache = new Subject();

function App() {
    return (
        <div className="App">
            <ChatRoom />
        </div>
    );
}

function ChatRoom() {
    const [messages, setMessages] = useState({messages: []})
    
    messageCache.subscribe(message => {
        let messages_tmp = [];
        messages.messages.forEach(element => {
            messages_tmp.push(element);
        });
        messages_tmp.push(message)
        setMessages({messages: messages_tmp})
    });

    return(
        <div className="ChatRoom-Wrapper">
            <div className="ChatRoom">
                <ChatMessageDisplay messages={messages.messages}/> 
                <NewMessageBox name={currentUser.name}/>
            </div>
        </div>
    );
}

function ChatMessageDisplay(props) {
    const messages = props.messages;
    const dummy = useRef(null);

    setTimeout(() => dummy.current && dummy.current.scrollIntoView({ behavior: 'smooth' }), 50);
    return(
        <div className="ChatMessageDisplay">
            {messages && messages.map(msg =>  <ChatMessage message={msg} key={msg.id}/>)}
            <span ref={dummy}></span>
        </div>
    )
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
