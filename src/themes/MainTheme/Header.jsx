import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.css";
import logo from "../../assets/images/image.png"
const Header = ({ user, handleLogout }) => {



  return (
    <div className="nav smart-pdf-nav">
      <div className="navbar-start"> 
        <div className="navbar-end">
          <div className="navbar-item">           
              <Link className="button is-small is-light" to="/login">SIGN IN </Link>
         </div>
        </div>
      </div>


    </div>
  );
};

export default Header;

/*
 <a className="navbar-content smart-pdf-site-title">
          Soft Digi Solutions
        </a>
*/