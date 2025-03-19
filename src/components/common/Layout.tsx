import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './common.scss';
import SideBar from './sidebar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <div className="main_content">
        <SideBar />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
