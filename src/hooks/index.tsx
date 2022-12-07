import React from 'react';
import { AuthProvider } from './auth';
import { ContactProvider } from './contacts';
// import { AuthProvider } from './auth';

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <ContactProvider>
        {children}
      </ContactProvider>
    </AuthProvider>
  );
};

export default AppProvider;