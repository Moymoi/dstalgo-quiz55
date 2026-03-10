import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';
import {
  fetchConversations,
  fetchConversation,
  createNewConversation,
} from '../store/slices/conversationSlice';
import ConversationItem from '../components/ConversationItem';
import Message from '../components/Message';
import FormComponent from '../components/FormComponent';
import EmptyState from '../components/EmptyState';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const { userInfo } = useSelector((state) => state.auth);
  const { conversations, activeConversation, loading } = useSelector((state) => state.conversation);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
      return;
    }
    dispatch(fetchConversations());
  }, [userInfo, navigate, dispatch]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeConversation?.messages]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleNewChat = () => {
    dispatch(createNewConversation());
  };

  const handleConversationClick = (id) => {
    dispatch(fetchConversation(id));
  };

  if (!userInfo) return null;

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#1a1a2e', overflow: 'hidden' }}>
      {/* Sidebar */}
      <div
        style={{
          width: '260px',
          minWidth: '260px',
          backgroundColor: '#0f0f23',
          display: 'flex',
          flexDirection: 'column',
          borderRight: '1px solid #1e1e36',
        }}
      >
        {/* Sidebar header */}
        <div style={{ padding: '16px' }}>
          <button
            onClick={handleNewChat}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: '10px',
              border: '1px solid #3a3a5a',
              backgroundColor: 'transparent',
              color: '#c0c0e0',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'background-color 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1e1e36')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <span style={{ fontSize: '18px' }}>✏️</span>
            New Chat
          </button>
        </div>

        {/* Conversation list */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '0 8px',
          }}
        >
          {conversations.length === 0 && !loading && (
            <p style={{ color: '#505070', fontSize: '13px', textAlign: 'center', padding: '20px 10px' }}>
              No conversations yet. Start a new chat!
            </p>
          )}
          {conversations.map((conv) => (
            <ConversationItem
              key={conv._id}
              conversation={conv}
              isActive={activeConversation?._id === conv._id}
              onClick={() => handleConversationClick(conv._id)}
            />
          ))}
        </div>

        {/* Sidebar footer */}
        <div style={{ padding: '16px', borderTop: '1px solid #1e1e36' }}>
          <div style={{ color: '#606080', fontSize: '12px', marginBottom: '10px', textAlign: 'center' }}>
            Signed in as <span style={{ color: '#9090d0', fontWeight: '600' }}>{userInfo.username}</span>
          </div>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: '10px',
              border: '1px solid #4a2a2a',
              backgroundColor: 'transparent',
              color: '#c08080',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'background-color 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2a1a1a')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <span>🚪</span>
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <div
          style={{
            padding: '14px 24px',
            borderBottom: '1px solid #1e1e36',
            backgroundColor: '#1a1a2e',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <span style={{ fontSize: '20px' }}>🔤</span>
          <h2 style={{ color: '#c0c0e0', fontSize: '16px', fontWeight: '600', margin: 0 }}>
            {activeConversation?.title || 'The Acronym Decipherer'}
          </h2>
        </div>

        {/* Messages area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 0' }}>
          {!activeConversation ? (
            <EmptyState />
          ) : (
            <>
              {activeConversation.messages && activeConversation.messages.map((msg, idx) => (
                <Message key={msg._id || idx} message={msg} />
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Form */}
        <FormComponent />
      </div>
    </div>
  );
};

export default HomeScreen;
