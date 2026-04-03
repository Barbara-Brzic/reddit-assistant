import ReactDOM from 'react-dom/client';
import React, { StrictMode } from 'react';
import { Toaster } from 'react-hot-toast';

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
        toastOptions={{
          duration: 4000,
          style: {
            background: 'hsl(0 0% 3.9%)',
            color: 'hsl(0 0% 98%)',
            border: '1px solid hsl(0 0% 14.9%)',
            padding: '16px',
            borderRadius: '8px',
            fontSize: '14px',
            maxWidth: '500px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: 'hsl(142 76% 36%)',
              secondary: 'hsl(0 0% 98%)',
            },
          },
          error: {
            duration: 4000,
            style: {
              background: 'hsl(0 62.8% 30.6%)',
              color: 'hsl(0 0% 98%)',
              border: '1px solid hsl(0 84.2% 60.2%)',
            },
            iconTheme: {
              primary: 'hsl(0 0% 98%)',
              secondary: 'hsl(0 62.8% 30.6%)',
            },
          },
        }}
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
