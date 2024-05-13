// PageLoader.js
import React from 'react';
import './PageLoader.css'; // Import your styles for the loader

const PageLoader = ({ loading,msg }) => {
  return loading ? (
    <div className="smart-page-loader">
      {/* You can use any loading indicator, e.g., a spinner */}
      <div className="smart-spinner"></div>
      {msg && msg.length > 1 ? <p className="smart-spinner-msg">{msg}</p>:<p className="smart-spinner-msg">Loading...</p>}
    </div>
  ) : null;
};

export default PageLoader;