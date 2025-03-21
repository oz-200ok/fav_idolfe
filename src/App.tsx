import { Routes, Route } from 'react-router-dom';
import Join from './pages/Join.tsx';
import Loginpage from './pages/Loginpage';
import Main from './pages/Main.tsx';
import Layout from './components/common/Layout.tsx';
import PrivacyPolicy from './components/PrivacyPolicy/index.tsx';

import GroupAddpage from './pages/GroupAddpage/Admin.tsx';
import Mypage from './pages/Mypage/index.tsx';

function App() {
  return (
    <Routes>
      {/* 🔥 Layout을 적용할 부모 Route 추가 */}
      <Route element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="/join" element={<Join />} />
        <Route path="/groupaddpage" element={<GroupAddpage />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/mypage" element={<Mypage />} />
      </Route>

      <Route path="/loginpage" element={<Loginpage />} />
    </Routes>
  );
}

export default App;
