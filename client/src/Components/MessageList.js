import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MessageItem from './MessageItem';

const MessageList = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/messages')
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
      });
  }, []);

  return (
    <div>
      <h2>Messages</h2>
      <ul>
        {messages.map(message => (
          <MessageItem key={message.id} message={message} />
        ))}
      </ul>
    </div>
  );
};

export default MessageList;

