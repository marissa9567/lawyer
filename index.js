import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import App from './App'; // Import your main App component

// A functional component to handle logging after rendering
function AppWithCallbackAfterRender() {
  useEffect(() => {
    console.log('App has been rendered');
  }, []); // Run effect once after the initial render

  return <App tab="home" />; // Render your main App component
}

const container = document.getElementById('root'); // Get the root element
const root = createRoot(container); // Create a root
root.render(<AppWithCallbackAfterRender />); // Render the component
