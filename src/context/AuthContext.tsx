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

    document.cookie = `access_token=${access_token}; path=/; max-age=3600`;
    document.cookie = `refresh_token=${refresh_token}; path=/; max-age=2592000`;
  };
  const markLoggedOut = () => {
    setIsLoggedIn(false);
    document.cookie = `access_token=; path=/; max-age=0`;
    document.cookie = `refresh_token=; path=/; max-age=0`;
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
