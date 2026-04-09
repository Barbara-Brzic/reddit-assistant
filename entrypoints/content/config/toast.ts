export const toastOptions = {
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
};
