import { Routes, Route } from 'react-router-dom';
import Join from './pages/Join.tsx';
import Loginpage from './pages/Loginpage.tsx';
import Mypage from './pages/Mypage.tsx';
import Main from './pages/Main.tsx';
import Layout from './components/common/Layout.tsx';
import Modal from './components/scheduleAdd/modal.tsx';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/join" element={<Join />} />
        <Route path="/loginpage" element={<Loginpage />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/test1" element={<Modal />} />
      </Routes>
    </Layout>
  );
}

export default App;
