import { createContext, useContext, useState } from 'react';

type AuthContextType = {
  accessToken: string | null;
  refreshToken: string | null;
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  saveToken: (tokens: { accessToken?: string; refreshToken?: string }) => void;
  clearAccessToken: () => void;
  clearRefreshToken: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  const saveToken = ({
    accessToken,
    refreshToken,
  }: {
    accessToken?: string;
    refreshToken?: string;
  }) => {
    if (accessToken) {
      localStorage.setItem('access_token', accessToken);
      setAccessToken(accessToken);
    }

    if (refreshToken) {
      localStorage.setItem('refresh_token', refreshToken);
      setRefreshToken(refreshToken);
    }
  };

  const clearAccessToken = () => {
    localStorage.removeItem('access_token');
    setAccessToken(null);
  };

  const clearRefreshToken = () => {
    localStorage.removeItem('refresh_token');
    setRefreshToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        clearAccessToken,
        clearRefreshToken,
        saveToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error('useAuth는 <AuthProvider> 내부에서만 사용할 수 있습니다.');
  return context;
};
