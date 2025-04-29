import React from 'react';
import { createRoot } from 'react-dom/client';
// We're removing the separate styles.css import and using only index.css
import './index.css'; // This now contains both Tailwind and custom styles
import App from './App';

const container = document.getElementById('root');
if (!container) {
    throw new Error('Failed to find the root element');
}

const root = createRoot(container);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);