import React from "react";
import { Link } from "react-router-dom";

interface NavMenuProp {
  text: string;
  path: string;
}

const NavMenu = (prop: NavMenuProp) => {
  return (
    <Link to={prop.path}>
      <div className="text-white mx-3 text-lg">{prop.text}</div>
    </Link>
  );
};

export default NavMenu;
