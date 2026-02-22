import React from 'react';

const ChatGPT = ({ messages }) => {
  return (
    <div>
      {messages
        .filter((m, idx) => idx >= 2)
        .map((msg, idx) => (
          <div style={{ color: msg.role === 'user' ? '' : 'blue' }} key={idx}>
            {msg.role === 'user' ? 'Q:' : 'A:'} {msg.content}
          </div>
        ))}
    </div>
  );
};
export default ChatGPT;