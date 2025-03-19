import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './sidebar.tsx';
import './common.scss';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <div className="main_content">
        <Sidebar />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
