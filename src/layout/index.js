import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles.css";
import { Breadcrumb } from "../projects";

const MenuItem = ({ path, title }) => {
  return (
    <li className="menu-item">
      <Link className="menu-link" to={path}>
        {title}
      </Link>
    </li>
  );
};

const Header = () => {
  return (
    <header className="header">
      <div className="logo">⭐ princefolio</div>
      <nav className="nav">
        <div className="menu-icon">&#9776;</div>
        <ul className="menu">
          <MenuItem path="/projects" title="Projects" />
          <MenuItem path="/about" title="About" />
          <MenuItem path="/contact" title="Contact" />
        </ul>
      </nav>
    </header>
  );
};

const Layout = ({ children }) => {
  const location = useLocation();
  return (
    <div className="layout">
      <Header />
      {location.pathname !== "/" && <Breadcrumb />}
      {children}
    </div>
  );
};

export default Layout;
