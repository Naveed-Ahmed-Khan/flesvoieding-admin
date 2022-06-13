import React from "react";

const Input = (props) => {
  return (
    <div className="flex flex-col gap-1 items">
      <label className="text-secondary font-semibold">{props.label}</label>
      <input
        className={` 
      ${props.width === "full" && "w-full"}
      ${props.width === "half" && "w-1/2"}
      ${props.disabled && "opacity-70"}
      bg-slate-200 border border-tertitary rounded px-4 py-2
      focus:ring-1 focus:ring-primary focus:border focus:border-primary 
        lg:px-5 lg:py-3`}
        placeholder={props.placeholder}
        name={props.name}
        onChange={props.onChange}
        value={props.value}
        type={props.type}
        disabled={props.disabled}
      />
    </div>
  );
};

export default Input;
