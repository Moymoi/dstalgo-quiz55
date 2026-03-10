import React from 'react';

const EmptyState = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        color: '#a0a0b8',
        padding: '40px',
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔤</div>
      <h1
        style={{
          fontSize: '28px',
          fontWeight: '700',
          color: '#e0e0f0',
          marginBottom: '12px',
          margin: '0 0 12px 0',
        }}
      >
        The Acronym Decipherer
      </h1>
      <p
        style={{
          fontSize: '16px',
          color: '#8080a0',
          marginBottom: '32px',
          maxWidth: '480px',
          lineHeight: '1.6',
        }}
      >
        Type any acronym and I&apos;ll tell you what it stands for. I only expand acronyms — I won&apos;t
        explain concepts or answer general questions.
      </p>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          justifyContent: 'center',
          maxWidth: '500px',
        }}
      >
        {['NASA', 'API', 'HTML', 'CSS', 'SQL', 'AI', 'CPU', 'URL', 'HTTP', 'PDF'].map((acronym) => (
          <span
            key={acronym}
            style={{
              padding: '6px 14px',
              backgroundColor: '#2a2a3e',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: '600',
              color: '#9090d0',
              border: '1px solid #3a3a5a',
              letterSpacing: '0.5px',
            }}
          >
            {acronym}
          </span>
        ))}
      </div>
      <p style={{ marginTop: '32px', fontSize: '13px', color: '#606080' }}>
        Start typing in the input below to begin a new conversation.
      </p>
    </div>
  );
};

export default EmptyState;
