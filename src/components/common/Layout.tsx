import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <header>헤더 들어갈 자리</header>
      <main>
        <Outlet /> {/* 이 부분이 중요! */}
      </main>
      <footer>푸터 들어갈 자리</footer>
    </div>
  );
}

export default Layout;
