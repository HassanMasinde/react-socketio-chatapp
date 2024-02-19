import React, { useState } from 'react';
import io from "socket.io-client";
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MessageList from './Components/MessageList';
import MessageForm from './Components/MessageForm';
import MessageItem from './Components/MessageItem'; // Import MessageItem component
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Router>
          <Switch>
            <Route path="/" exact>
              <MessageList />
            </Route>
            <Route path="/respond">
              <MessageForm />
            </Route>
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;

