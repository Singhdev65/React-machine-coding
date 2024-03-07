import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles.css"

const Breadcrumb = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);

    return (
        <div className="breadcrumb">
            <Link to="/">Home</Link>
            {pathnames.map((name, index) => {
                const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                return (
                    <React.Fragment key={name}>
                        <span>/</span> {/* Include the separator here */}
                        <Link to={routeTo}>
                            <span className="breadcrumb-item">{name}</span>
                        </Link>
                    </React.Fragment>
                );
            })}
        </div>
    );
};


const MenuItem = ({ path, title }) => {
    return (
        <li className="container">
            <Link className="link" to={path}>
                {title}
            </Link>
        </li>
    )
}

const Header = () => {
    return <header>
        <div className="logo">⭐</div>
        <nav>
            <div className="menu-icon">&#9776;</div>
            <ul>
                <MenuItem title="Projects" path="/projects" />
            </ul>
        </nav>
    </header>
}

const Layout = ({ children }) => (
    <div className="layout">
        <Header />
        <Breadcrumb />
        {children}
    </div>
);

export default Layout