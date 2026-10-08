import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Purge any legacy custom photo cache to ensure latest uploaded assets display properly
try {
  localStorage.removeItem('wb_3205_custom_photos');
} catch {
  // Ignore storage access errors
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
