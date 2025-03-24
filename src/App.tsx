import { Routes, Route } from 'react-router-dom';
import JoinIntro from './pages/JoinIntro';
import Loginpage from './pages/Loginpage';
import Main from './pages/Main.tsx';
import Layout from './components/common/Layout.tsx';
import PrivacyPolicy from './components/PrivacyPolicy/index.tsx';

import GroupAddpage from './pages/GroupAddpage/Admin.tsx';
import Mypage from './pages/Mypage/index.tsx';
import KakaoCallBack from './components/KakaoCallback/index.tsx';
import NaverCallback from './components/NaverCallback/index.tsx';
import JoinPage from './pages/Joinpage/index.tsx';

function App() {
  return (
    <Routes>
      {/* 🔥 Layout을 적용할 부모 Route 추가 */}
      <Route element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="/groupaddpage" element={<GroupAddpage />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/mypage" element={<Mypage />} />
      </Route>
      <Route path="/joinpage" element={<JoinPage />} />
      <Route path="/joinintro" element={<JoinIntro />} />
      <Route path="/loginpage" element={<Loginpage />} />
      <Route path="/auth/kakao/callback" element={<KakaoCallBack />} />
      <Route path="/auth/naver/callback" element={<NaverCallback />} />
    </Routes>
  );
}

export default App;
