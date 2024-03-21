// src/App.tsx

import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config'; // Make sure this path is correct
import AuthPage from './auth'; // Update with your actual auth component path
import ChatPage from './ChatPage'; // Update with your actual chat component path
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

function App() {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <div>Loading...</div>
    );
  }

  if (error) {
    return (
      <div>Error: {error.message}</div>
    );
  }

  return (
    
      <div className="max-w-md w-full mx-auto h-screen shadow-lg">
        {user ? <ChatPage /> : <AuthPage />}
      </div>
  );
}

export default App;
