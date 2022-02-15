import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <span>
        <a href="/hkrbooks">
          <img src="https://hannekristinrohde.no/wp-content/uploads/2020/01/cropped-Logo-copy-1.png" />
        </a>
      </span>
      <span>
        <a href="/hkrbooks/Login" className="login">
          Login
        </a>
      </span>
    </div>
  );
}

export default Navbar;
