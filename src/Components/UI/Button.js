import React from "react";

const Button = ({ children, alt, onClick, type, disabled, scale }) => {
  return (
    <button
      className={`${
        alt
          ? "border border-red-500 text-red-500 hover:text-white hover:bg-red-500"
          : `text-white  ${
              disabled
                ? "bg-primary opacity-60"
                : ` active:scale-100  hover:scale-110
                  bg-primary active:bg-primaryL hover:bg-primaryD hover:drop-shadow-xl hover:shadow-sm`
            } `
      } transition-all duration-150 text-sm py-[6px] px-[12px] rounded-md`}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
