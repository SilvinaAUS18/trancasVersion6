import React from "react";

const Input = ({ type, value, onChange, name, label, placeholder }) => {
  return (
    <div className="space-y-1">
      <label className="text-blue-600">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        className="w-full bg-blue-50 p-3 rounded-lg text-blue-700"
      />
    </div>
  );
};

export default Input;
