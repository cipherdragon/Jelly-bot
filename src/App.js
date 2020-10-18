// author: Adeepa Gunathilake

// ============================================

import React, { useRef } from 'react';
import './App.css';
import { useState } from "react";
import { Subject } from "rxjs";

// currentUser object contains data about the user who use this react app in the
// browser currently. Name is hardcoded currently.
const currentUser = {
    name: 'Bob',
    uid : (() => {
        // TODO : Write the logic to generate a user id. 
        // I prefer using firebase().auth().currentUser.uid but this project isn't using firebase.
        // So have to do a workaround.
        return (Math.random() * 100000).toFixed(0);
    })()
}

// const hardcodedMessages = [
//     {
//         "id" : 1,
//         "uid" : 1,
//         "name" : "Alice",
//         "text" : "Hi!"
//     },
//     {
//         "id" : 2,
//         "uid" : 1,
//         "name" : "Alice",
//         "text" : "Hi there!"
//     },
//     {
//         "id" : 3,
//         "uid" : currentUser.uid,
//         "name" : "Bob",
//         "text" : "Hi!"
//     },
//     {
//         "id" : 4,
//         "uid" : 4,
//         "name" : "Bot",
//         "text" : "I'm the bot!"
//     },
//     {
//         "id" : 5,
//         "uid" : currentUser.uid,
//         "name" : "Bob",
//         "text" : "Again Bob here! this is a long long long long and loooonnng message. Let's see how my css render this."
//     }
//     ,
//     {
//         "id" : 6,
//         "uid" : 4,
//         "name" : "Bot",
//         "text" : "It is super bad. Add max-width for message and reduce font size too."
//     }
// ]

const messageStream = new Subject();
const localMessageCache = [];

function App() {
    // setTimeout(() => {
    //     hardcodedMessages.forEach(element => {
    //         messageStream.next(element)
    //     });
    // })

    return (
        <div className="App">
            <ChatRoom />
        </div>
    );
}

function ChatRoom() {
    const [updateState, toggleUpdate] = useState(false);
    const reRender = () => toggleUpdate(!updateState);
    
    messageStream.subscribe(message => {
        addToLocalCache(message);
        setTimeout(reRender, 100) //setTimeout is used to prevent bouncing.
    });

    return(
        <div className="ChatRoom-Wrapper">
            <div className="ChatRoom">
                <ChatMessageDisplay messages={localMessageCache}/> 
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
        
        const message = {
            id: generateMessageID(getServerTimestamp()),
            uid: currentUser.uid,
            name: currentUser.name,
            text: newMessage,
        }
        sendMessage(JSON.stringify(message));
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

// functions below this line are just utility functions used by front end code.
// better don't touch them.

function addToLocalCache(message) {
    const length = localMessageCache.length;
    const lastMessage = localMessageCache[length - 1];

    const isDuplicate = () => {
        return message.id === (lastMessage && lastMessage.id);
    }

    if (isDuplicate()) return;

    localMessageCache.push(message);
}

// following function returns a ID for a message. Since a user can't send more than
// one message in the same millisecond, a combination of uid and createdAt gives a
// fairly unique message id. 
function generateMessageID(createdAt) {
    return createdAt + currentUser.uid.toString();
}

// functions below this line are utility functions used to communicate with server.
// Implement them appropriately.

function getNewMessages() {
    // TODO : listen to server and get new messages, stream them with messageStream. 
    // Remember to parse the JSON message before streaming through messageStream.
}

function sendMessage(message) {
    // TODO : Add the code to send new messages to the server here.
    // Used the following line just for testing.
    messageStream.next(JSON.parse(message))
}

function getServerTimestamp() {
    // TODO : This function should have a method to return timestamp from server.
    // Currently I'm issuing a timestamp from client side.

    return (new Date()).toISOString();
}

export default App;
