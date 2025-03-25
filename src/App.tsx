import { Routes, Route } from 'react-router-dom';
import Loginpage from './pages/Loginpage';
import MainPage from './pages/MainPage/index.tsx';
import Layout from './components/common/Layout.tsx';
import PrivacyPolicy from './components/PrivacyPolicy/index.tsx';

import GroupAddpage from './pages/GroupAddpage/index.tsx';
import Mypage from './pages/Mypage/index.tsx';
import KakaoCallBack from './components/KakaoCallback/index.tsx';
import NaverCallback from './components/NaverCallback/index.tsx';

import QuitPage from './pages/Quit/index.tsx';
import QuitModal from './pages/QuitModal/index.tsx';
import SearchPage from './pages/SearchPage/index.tsx';
import GroupManagementPage from './pages/GroupManagementPage/index.tsx';
import Modal from './components/scheduleAdd/modal.tsx';

function App() {
  return (
    <Routes>
      {/* 🔥 Layout을 적용할 부모 Route 추가 */}
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/my_page" element={<Mypage />} />
        <Route path="/quit_modal" element={<QuitModal />} />
        <Route path="/search_page" element={<SearchPage />} />
        <Route path="/privacy_policy" element={<PrivacyPolicy />} />
        <Route path="/group_add_page" element={<GroupAddpage />} />
        <Route
          path="/group_management_page"
          element={<GroupManagementPage />}
        />
      </Route>

      <Route path="/quit_page" element={<QuitPage />} />
      <Route path="/login_page" element={<Loginpage />} />
      <Route path="/auth/kakao/callback" element={<KakaoCallBack />} />
      <Route path="/auth/naver/callback" element={<NaverCallback />} />
      <Route path="/test1" element={<Modal />} />
    </Routes>
  );
}

export default App;
