import React from "react";

function CustomInput({ label, type = "text", value, onChange, placeholder }) {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-bold text-white">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="p-2 w-full text-black border border-gray-300 rounded"
      />
    </div>
  );
}

export default CustomInput;
