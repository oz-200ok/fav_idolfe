import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx';
import { GroupProvider } from './context/GroupContext.tsx';

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <GroupProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GroupProvider>
  </AuthProvider>,
);
