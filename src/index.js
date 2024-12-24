import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import App from './App';
import './style.css';

// React 18+ uses createRoot instead of render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
