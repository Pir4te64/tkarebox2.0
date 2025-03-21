import React from "react";

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
    <details className="mb-4 bg-azul p-4 rounded">
      <summary className="cursor-pointer font-bold mb-2 text-white">
        {title}
      </summary>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          placeholder={inputPlaceholder}
          value={newAllergyValue}
          onChange={onNewAllergyChange}
          className="flex-1 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={onAddAllergy}
          className="p-2 bg-blue-500 text-white rounded"
        >
          +
        </button>
      </div>
      <ul className="ml-4">
        {allergies.map((allergy, index) => (
          <li key={index} className="mb-1 text-white">
            {allergy}
            <button
              onClick={() => onRemoveAllergy(allergy)}
              className="text-red-500 ml-2 text-xl"
            >
              -
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-2">
        {allergies.map((allergy, index) => (
          <span
            key={index}
            className="inline-block bg-gray-200 rounded-full px-2 py-1 mr-2 mb-2 text-sm"
          >
            {allergy}
          </span>
        ))}
      </div>
    </details>
  );
};

export default AllergyInputSection;
