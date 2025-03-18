import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import { Routes, Route } from 'react-router-dom';
import Join from './pages/Join.tsx';
import Loginpage from './pages/Loginpage';
import Mypage from './pages/Mypage.tsx';
import Main from './pages/Main.tsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/join" element={<Join />} />
      <Route path="/loginpage" element={<Loginpage />} />
      <Route path="/mypage" element={<Mypage />} />
    </Routes>
  );
}

export default App;
