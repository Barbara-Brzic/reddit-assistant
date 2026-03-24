import ReactDOM from 'react-dom/client';
import React, { StrictMode } from 'react';
import { Toaster } from 'react-hot-toast';

export const CreateContentElement = (
  uiContainer: HTMLElement,
  shadowContainer: HTMLElement,
  callback: (root: ReactDOM.Root) => React.ReactNode
): ReactDOM.Root => {
  const app = document.createElement('div');
  uiContainer.append(app);

  const styles = {
    visibility: 'visible',
    position: 'fixed',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    width: '100%',
    height: '100%',
    zIndex: '9999',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  };
  Object.assign(shadowContainer.style, styles);

  const root = ReactDOM.createRoot(app);
  root.render(
    <StrictMode>
      <Toaster />
      {callback(root)}
    </StrictMode>
  );
  return root;
};
