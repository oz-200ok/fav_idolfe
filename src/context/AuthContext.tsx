import { useContext, useState } from 'react';
import { createContext } from 'react';

type T_AuthContextType = {
  isLoggedIn: boolean;
  markLoggedIn: (access_token: string, refresh_token: string) => void;
  markLoggedOut: () => void;
};

const AuthContext = createContext<T_AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const markLoggedIn = (access_token: string, refresh_token: string) => {
    setIsLoggedIn(true);
    console.log(document.cookie);

    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
  };

  const markLoggedOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, markLoggedIn, markLoggedOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error(
      'useLogged는 <AuthProvider> 내부에서만 사용할 수 있습니다.',
    );
  return context;
};
