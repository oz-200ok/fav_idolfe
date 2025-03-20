import { Routes, Route } from 'react-router-dom';
import Join from './pages/Join.tsx';
import Loginpage from './pages/Loginpage';
import Mypage from './pages/Mypage.tsx';
import Main from './pages/Main.tsx';
import Layout from './components/common/Layout.tsx';

function App() {
  return (
    <Routes>
      {/* ✅ Layout을 적용할 페이지 */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Main />} /> {/* 메인 페이지 */}
        <Route path="join" element={<Join />} />
        <Route path="mypage" element={<Mypage />} />
      </Route>

      {/* ❌ Layout 없이 렌더링할 페이지 */}
      <Route path="/loginpage" element={<Loginpage />} />
    </Routes>
  );
}

export default App;
