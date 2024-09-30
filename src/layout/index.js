import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import { Breadcrumb } from "../projects";

const MenuItem = ({ path, title }) => {
  return (
    <li className="container">
      <Link className="link" to={path}>
        {title}
      </Link>
    </li>
  );
};

const Header = () => {
  return (
    <header>
      <div className="logo">⭐</div>
      <nav>
        <div className="menu-icon">&#9776;</div>
        <ul>
          <MenuItem title="Projects" path="/projects" />
        </ul>
      </nav>
    </header>
  );
};

const Layout = ({ children }) => (
  <div className="layout">
    <Header />
    <Breadcrumb />
    {children}
  </div>
);

export default Layout;
