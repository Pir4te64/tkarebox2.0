import React from "react";

function CustomInput({ label, type = "text", value, onChange, placeholder }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label
        style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}
      >
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{ padding: "0.5rem", width: "100%" }}
      />
    </div>
  );
}

export default CustomInput;
