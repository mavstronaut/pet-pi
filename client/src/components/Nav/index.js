import React from "react";
import "./style.css";

function Nav() {
  return (
    <nav className="nav navbar-expand-lg navbar-dark">
      <a className="nav-link text-info" href="/">
        <h3>Pet-pi Pet-Home Trainer</h3>
      </a>
      <a className="nav-link mt-2 text-info" href="/">Audio</a>
      <a className="nav-link mt-2 text-info" href="/login">Login</a>
      <a className="nav-link mt-2 text-info" href="/video">Stream: coming Soon</a>
    </nav>
  );
}

export default Nav;
