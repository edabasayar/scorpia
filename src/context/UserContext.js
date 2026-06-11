import React, { createContext, useContext, useState } from 'react';

// Uygulama oturumu boyunca kullanıcı bilgisini tutar.
// ProfileScreen unmount olsa bile (çıkış/giriş navigasyonu) değer korunur.
const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [username, setUsername] = useState('sefa123');

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error('useUser, UserProvider içinde kullanılmalı');
  }
  return ctx;
}
