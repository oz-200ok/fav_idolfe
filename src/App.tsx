import { Routes, Route } from 'react-router-dom';
import JoinIntro from './pages/JoinIntro';
import Loginpage from './pages/Loginpage.tsx';
import Mypage from './pages/Mypage.tsx';
import Main from './pages/Main.tsx';
import Layout from './components/common/Layout.tsx';
import JoinPage from './pages/Joinpage.tsx/index.tsx';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/joinintro" element={<JoinIntro />} />
        <Route path="/joinpage" element={<JoinPage />} />
        <Route path="/loginpage" element={<Loginpage />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
    </Layout>
  );
}

export default App;
