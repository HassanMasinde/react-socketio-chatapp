import React from 'react';

const MessageItem = ({ message }) => {
  return (
    <li>
      <strong>From: {message.sender}</strong>
      <p>{message.content}</p>
    </li>
  );
};

export default MessageItem;

