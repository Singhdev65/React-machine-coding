import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="breadcrumb">
      <Link to="/">Home</Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        return (
          <React.Fragment key={name}>
            <span>/</span>
            <Link to={routeTo}>
              <span className="breadcrumb-item">{name}</span>
            </Link>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
