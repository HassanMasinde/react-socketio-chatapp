import React, { useState } from 'react';
import axios from 'axios';

const MessageForm = () => {
  const [response, setResponse] = useState('');

  const handleSubmit = () => {
    if (response) {
      // Send response to backend
      axios.post('http://localhost:3001/messages/respond', { response })
        .then(response => {
          console.log('Response sent successfully');
        })
        .catch(error => {
          console.error('Error sending response:', error);
        });
      
      // Clear response field
      setResponse('');
    }
  };

  return (
    <div>
      <h2>Respond to Message</h2>
      <textarea value={response} onChange={e => setResponse(e.target.value)}></textarea>
      <button onClick={handleSubmit}>Send Response</button>
    </div>
  );
};

export default MessageForm;

