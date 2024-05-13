// LoginLayout.js
import React from 'react';
import Header from './MainTheme/Header';
import test from "../assets/images/sidetest.png"
import { useSiteContext } from '../contexts/SiteProvider';
import './MainLayoutStyle.css'


const MainLayout = ({ children }) => {
  const { user, setUser } = useSiteContext();
  const handleLogout = () => {
    setUser();
  }
  return (
    <div className="container smart-pdf-container">
      <div className="full-main">
        <Header user={user} handleLogout={handleLogout} />
        <div className='value-main'>
          <h1 className='text-1'>Smart Effortless <br /> PDF Solutions</h1>
          <p>
            Unlock a suite of powerful PDF tools on our platform — merge, compress, <br />
            and manipulate PDFs effortlessly for seamless document management. <br />
            Elevate your PDF experience with simplicity and efficiency.</p>
          <img src={test} />
        </div>
      </div>
      <main className='smart-mainlayout-middle p-5'>{children}</main>
      <footer className='smart-pdf-footer' >

      </footer>
    </div>
  );
};

export default MainLayout;