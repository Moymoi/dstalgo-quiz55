import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../store/slices/conversationSlice';
import Loader from './Loader';

const FormComponent = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const { activeConversation, loading } = useSelector((state) => state.conversation);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;
    dispatch(
      sendMessage({
        conversationId: activeConversation?._id || null,
        message: trimmed,
      })
    );
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div
      style={{
        padding: '16px 24px',
        borderTop: '1px solid #2a2a3e',
        backgroundColor: '#1a1a2e',
      }}
    >
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '8px', paddingLeft: '4px' }}>
          <Loader />
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'flex-end',
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          placeholder="Type an acronym to decipher..."
          rows={1}
          style={{
            flex: 1,
            padding: '12px 16px',
            borderRadius: '12px',
            border: '1px solid #3a3a5a',
            backgroundColor: '#252540',
            color: '#e0e0f0',
            fontSize: '15px',
            outline: 'none',
            resize: 'none',
            lineHeight: '1.5',
            maxHeight: '120px',
            overflowY: 'auto',
            fontFamily: 'inherit',
            transition: 'border-color 0.2s ease',
          }}
          onFocus={(e) => (e.target.style.borderColor = '#5b5bd6')}
          onBlur={(e) => (e.target.style.borderColor = '#3a3a5a')}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          style={{
            padding: '12px 20px',
            borderRadius: '12px',
            border: 'none',
            backgroundColor: loading || !input.trim() ? '#2a2a4a' : '#5b5bd6',
            color: loading || !input.trim() ? '#606080' : '#fff',
            cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
            fontSize: '18px',
            transition: 'background-color 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '50px',
            height: '46px',
          }}
        >
          ➤
        </button>
      </form>
      <p style={{ textAlign: 'center', fontSize: '12px', color: '#404060', marginTop: '8px' }}>
        The Acronym Decipherer only expands acronyms. Press Enter to send.
      </p>
    </div>
  );
};

export default FormComponent;
