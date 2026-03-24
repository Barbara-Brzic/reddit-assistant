import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import CredentialForm from '@/entrypoints/popup/components/CredentialForm.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CredentialForm />
  </React.StrictMode>
);
