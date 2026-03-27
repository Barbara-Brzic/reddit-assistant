import ReactDOM from 'react-dom/client';
import React, { StrictMode } from 'react';
import { Toaster } from 'react-hot-toast';

export const CreateContentElement = (
  uiContainer: HTMLElement,
  callback: (root: ReactDOM.Root) => React.ReactNode
): ReactDOM.Root => {
  // Clear container
  uiContainer.innerHTML = '';

  // Create backdrop overlay
  const backdrop = document.createElement('div');
  Object.assign(backdrop.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '10000',
  });

  // Create app container with dark mode
  const app = document.createElement('div');
  app.className = 'dark';
  backdrop.appendChild(app);
  uiContainer.appendChild(backdrop);

  const root = ReactDOM.createRoot(app);
  root.render(
    <StrictMode>
      <Toaster />
      {callback(root)}
    </StrictMode>
  );
  return root;
};
