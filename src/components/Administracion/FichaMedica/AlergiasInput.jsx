import React from "react";

const chipStyle = {
  display: "inline-block",
  background: "#eee",
  borderRadius: "16px",
  padding: "4px 8px",
  marginRight: "8px",
  marginBottom: "8px",
};

const AllergyInputSection = ({
  title,
  inputPlaceholder,
  newAllergyValue,
  onNewAllergyChange,
  onAddAllergy,
  allergies,
  onRemoveAllergy,
}) => {
  return (
    <details style={{ marginBottom: "1rem" }}>
      <summary
        style={{
          cursor: "pointer",
          fontWeight: "bold",
          marginBottom: "0.5rem",
        }}
      >
        {title}
      </summary>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
        <input
          type="text"
          placeholder={inputPlaceholder}
          value={newAllergyValue}
          onChange={onNewAllergyChange}
          style={{ flex: 1, padding: "0.5rem" }}
        />
        <button onClick={onAddAllergy} style={{ padding: "0.5rem" }}>
          +
        </button>
      </div>
      <ul style={{ marginLeft: "1rem" }}>
        {allergies.map((allergy, index) => (
          <li key={index} style={{ marginBottom: "0.3rem" }}>
            {allergy}{" "}
            <button
              onClick={() => onRemoveAllergy(allergy)}
              style={{ color: "red", marginLeft: "0.5rem" }}
            >
              -
            </button>
          </li>
        ))}
      </ul>
      <div style={{ marginTop: "0.5rem" }}>
        {allergies.map((allergy, index) => (
          <span key={index} style={chipStyle}>
            {allergy}
          </span>
        ))}
      </div>
    </details>
  );
};

export default AllergyInputSection;
