import { Routes, Route } from 'react-router-dom';
import Join from './pages/Join.tsx';
import Loginpage from './pages/Loginpage.tsx';
import Mypage from './pages/Mypage.tsx';
import Main from './pages/Main.tsx';

// ✅ Header + Footer + SideBar 모두 유지!
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import SideBar from './components/common/SideBar';

function App() {
  return (
    <>
      <Header /> {/* ✅ Header 추가 */}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/join" element={<Join />} />
        <Route path="/loginpage" element={<Loginpage />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
      <Footer /> {/* ✅ Footer 추가 */}
      <SideBar /> {/* ✅ SideBar 추가 */}
    </>
  );
}

export default App;
