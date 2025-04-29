import React from 'react';
import { createRoot } from 'react-dom/client';
// Zuerst Tailwind CSS importieren
import './index.css';
// Dann die eigenen Styles importieren (diese überschreiben Tailwind)
import './styles/styles.css';
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