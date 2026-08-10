import React from 'react';
import { ToastProvider } from './context/ToastContext';
import AppRouter from './routes/AppRouter';

export const App: React.FC = () => {
  return (
    <ToastProvider>
      <AppRouter />
    </ToastProvider>
  );
};

export default App;
