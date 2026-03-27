import React from 'react';

export default function StatusMessage({
  message,
  variant = 'default',
}: Readonly<{
  message: string;
  variant?: 'default' | 'error';
}>) {
  const textColor = variant === 'error' ? 'text-destructive' : 'text-primary';
  return (
    <div className="flex items-center justify-center p-8 bg-secondary rounded-lg">
      <p className={textColor}>{message}</p>
    </div>
  );
}