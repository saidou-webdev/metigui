import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Assurez-vous que l'élément existe
const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement); // Créer le root
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.error('Element with id "root" not found');
}
