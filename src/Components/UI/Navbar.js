import React from "react";
import menu from "../../Assets/Images/menu-outline.svg";

const Navbar = (props) => {
  return (
    <div className="md:hidden flex items-center justify-between px-6 h-16 bg-primary ">
      <img
        onClick={() => {
          props.setOpen(!props.open);
          props.setShowBackdrop(true);
        }}
        src={menu}
        alt="menu"
        className="object-contain h-8 cursor-pointer"
      />
    </div>
  );
};

export default Navbar;
