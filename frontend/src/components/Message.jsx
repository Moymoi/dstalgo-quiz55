import React from 'react';

const Message = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        marginBottom: '16px',
        padding: '0 16px',
      }}
    >
      {!isUser && (
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#7c7cff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '10px',
            flexShrink: 0,
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#fff',
          }}
        >
          A
        </div>
      )}
      <div
        style={{
          maxWidth: '70%',
          padding: '12px 16px',
          borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
          backgroundColor: isUser ? '#5b5bd6' : '#2a2a3e',
          color: '#e8e8f0',
          fontSize: '15px',
          lineHeight: '1.6',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        }}
      >
        {message.content}
      </div>
      {isUser && (
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#5b5bd6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '10px',
            flexShrink: 0,
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#fff',
          }}
        >
          U
        </div>
      )}
    </div>
  );
};

export default Message;
