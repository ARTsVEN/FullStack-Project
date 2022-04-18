import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './LogoUnklab.svg';

const NavBar = () => {
  return (
    <div>
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand">
    <div className="shadow p-3">
        <img src={Logo} alt="logo" width="35" height="35" />
    </div>
    </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">
              Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/updateprofile">
              Profile
          </Link>
        </li>
        <div className="position-absolute top-10 end-0"> 
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/Login">
              Logout
          </Link>
        </li>
        </div>
      </ul>
    </div>
  </div>
</nav>
    </div>
  )
}

export default NavBar; 