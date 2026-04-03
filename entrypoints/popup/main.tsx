import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import CredentialForm from '@/entrypoints/popup/components/CredentialForm.tsx';
import { Toaster } from 'react-hot-toast';
import { TooltipProvider } from '@/components/ui/tooltip.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TooltipProvider>
      <Toaster />
      <CredentialForm />
    </TooltipProvider>
  </React.StrictMode>
);
