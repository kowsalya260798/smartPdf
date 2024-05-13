import React from 'react';
import logo from './logo.svg';
import 'bulma/css/bulma.min.css'; // Import Bulma CSS
import 'bulma-checkradio/dist/css/bulma-checkradio.min.css';
import 'bulma-switch/dist/css/bulma-switch.min.css';
import './App.css';
import SiteRoute from './routing/SiteRoute';
import { SiteProvider } from './contexts/SiteProvider';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <SiteProvider>
      <div className="App">
        <SiteRoute />
      </div>     
    </SiteProvider>
  );
}

export default App;
