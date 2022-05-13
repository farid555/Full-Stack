import React from "react";
import NavMenu from "./NavMenu";

const NavMenus = () => {
  return (
    <div className="flex items-center">
      <NavMenu path={"/"} text={"Home"} />
      <NavMenu path={"/"} text={"About"} />
    </div>
  );
};

export default NavMenus;
