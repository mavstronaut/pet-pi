import React from "react";
import "./style.css";

function Nav() {
  return (
    <nav className="nav navbar-expand-lg navbar-dark">
      <a className="nav-link text-info" href="/">
        <h3>pet Pi</h3>
      </a>
      <a className="nav-link mt-2 text-info" href="/">Login</a>
      <a className="nav-link mt-2 text-info" href="/saved">Sounds</a>
    </nav>
  );
}

export default Nav;
