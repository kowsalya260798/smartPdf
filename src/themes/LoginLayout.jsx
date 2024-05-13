import React from 'react';

const LoginLayout = ({ children }) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

export default LoginLayout;
/*

  <footer className="footer has-background-warning-dark" style={{ height: '60px', padding: '10px 0', boxSizing: 'border-box' }}>
        <div className="container">
          <p className="title has-text-white">&copy; {new Date().getFullYear()} PDF. All rights reserved.</p>
        </div>
      </footer>

         <header className="content has-background-warning-dark" style={{ height: '60px' }}>
        <div className="container">
          <h1 className="title has-text-white">PDF</h1>
        </div>
      </header>

*/