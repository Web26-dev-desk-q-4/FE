import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = props => {
  return (
    <nav className= "Navclass">
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register">Register</NavLink>
    </nav>
  );
};

export default NavBar;
