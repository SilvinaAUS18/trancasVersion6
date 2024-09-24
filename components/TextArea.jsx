import React from "react";

const TextArea = ({ rows, value, onChange, name, label, placeholder }) => {
  return (
    <div className="space-y-1">
      <label className="text-blue-950">{label}</label>
      <textarea
        rows={rows}
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        className="w-full bg-blue-200 text-blue-950 p-3 rounded-lg"
      />
    </div>
  );
};

export default TextArea;
