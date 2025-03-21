import { Routes, Route } from 'react-router-dom';
import Join from './pages/Join.tsx';
import Loginpage from './pages/Loginpage';
import Mypage from './pages/Mypage';
import Main from './pages/Main.tsx';
import SearchPage from './pages/SearchPage/index.tsx';
import Layout from './components/common/Layout.tsx';
import PrivacyPolicy from './components/PrivacyPolicy/index.tsx';

function App() {
  return (
    <Routes>
      {/* 🔥 Layout을 적용할 부모 Route 추가 */}
      <Route element={<Layout />}>
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/" element={<Main />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/join" element={<Join />} />
        <Route path="/loginpage" element={<Loginpage />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/searchPage/:keyword" element={<SearchPage />} />
      </Route>
    </Routes>
  );
}

export default App;
