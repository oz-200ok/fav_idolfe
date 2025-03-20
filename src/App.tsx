import { Routes, Route } from 'react-router-dom';
import Join from './pages/Join.tsx';
import Loginpage from './pages/Loginpage';
import Mypage from './pages/Mypage.tsx';
import Main from './pages/Main.tsx';
import Layout from './components/common/Layout.tsx';

function App() {
  return (
    <Routes>
      {/* 🔥 Layout을 적용할 부모 Route 추가 */}
      <Route element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="/join" element={<Join />} />
        <Route path="/mypage" element={<Mypage />} />
        <p> 잘 됐으면 이게 보여야함</p>
      </Route>
      <Route path="/loginpage" element={<Loginpage />} />
    </Routes>
  );
}

export default App;
