import React from 'react';

const ConversationItem = ({ conversation, isActive, onClick }) => {
  const title = conversation.title || 'Untitled Conversation';
  const truncated = title.length > 30 ? title.substring(0, 30) + '…' : title;

  return (
    <div
      onClick={onClick}
      style={{
        padding: '10px 14px',
        borderRadius: '8px',
        cursor: 'pointer',
        backgroundColor: isActive ? '#2a2a4a' : 'transparent',
        color: isActive ? '#c5c5ff' : '#a0a0b8',
        fontSize: '14px',
        marginBottom: '4px',
        transition: 'background-color 0.15s ease',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        border: isActive ? '1px solid #3d3d6b' : '1px solid transparent',
      }}
      onMouseEnter={(e) => {
        if (!isActive) e.currentTarget.style.backgroundColor = '#1e1e36';
      }}
      onMouseLeave={(e) => {
        if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      <span style={{ fontSize: '16px' }}>💬</span>
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{truncated}</span>
    </div>
  );
};

export default ConversationItem;
