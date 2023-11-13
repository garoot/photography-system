import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import './index.css'; // Global styles
import App from './App'; // The root component for your application

// Find the root element in your HTML
const rootElement = document.getElementById('root');
// Create a root using createRoot
const root = createRoot(rootElement);

// Use the root.render method to render your app component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
