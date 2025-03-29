import { useContext, useState, createContext } from 'react';

//토큰 저장&삭제 + 로그인 상태 관리 로직

type T_AuthContextType = {
  isLoggedIn: boolean;
  markLoggedIn: (access_token: string, refresh_token: string) => void;
  markLoggedOut: () => void;
};

const defaultAuthContext: T_AuthContextType = {
  isLoggedIn: false,
  markLoggedIn: () => {},
  markLoggedOut: () => {},
};

const AuthContext = createContext<T_AuthContextType>(defaultAuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const markLoggedIn = (access_token: string, refresh_token: string) => {
    setIsLoggedIn(true);

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
    throw new Error('useAuth는  <AuthProvider> 내부에서만 사용할 수 있습니다.');
  return context;
};
