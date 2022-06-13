import React from "react";

const TextArea = ({
  label,
  type,
  rows,
  placeholder,
  name,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-secondary font-semibold">{label}</label>
      <textarea
        className="bg-slate-200 focus:ring-1 focus:ring-primary focus:border focus:border-primary rounded 
        px-4 py-2 lg:px-5 lg:py-3 text-justify leading-relaxed h-[120px]"
        type={type}
        rows={rows}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TextArea;
