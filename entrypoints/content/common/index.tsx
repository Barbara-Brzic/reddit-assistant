import ReactDOM from 'react-dom/client';
import React, { StrictMode } from 'react';
import { Toaster } from 'react-hot-toast';
import { toastOptions } from '@/entrypoints/content/config/toast.ts';

export const CreateContentRoot = (
  uiContainer: HTMLElement,
  callback: (root: ReactDOM.Root) => React.ReactNode,
  onRemove?: () => void
): ReactDOM.Root => {
  // Clear container
  uiContainer.innerHTML = '';

  // Create backdrop overlay
  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop-enter';
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

  // Function to handle closing with animation
  const handleBackdropClose = () => {
    backdrop.className = 'modal-backdrop-exit';
    setTimeout(() => {
      if (onRemove) onRemove();
    }, 200);
  };

  // Close modal when clicking backdrop
  backdrop.addEventListener('click', handleBackdropClose);

  // Create app container with dark mode
  const app = document.createElement('div');
  app.className = 'dark';

  // Prevent clicks on modal content from closing it
  app.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  backdrop.appendChild(app);
  uiContainer.appendChild(backdrop);

  const root = ReactDOM.createRoot(app);
  root.render(
    <StrictMode>
      <Toaster
        position="top-center"
        toastOptions={toastOptions}
        containerStyle={{
          top: 20,
          zIndex: 10001,
        }}
      />
      {callback(root)}
    </StrictMode>
  );
  return root;
};
