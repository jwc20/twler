import { useState } from "react";

function ResultFilter({ onGenderSelected, selectedGender }) {
  const handleGenderChange = (e) => {
    onGenderSelected(e.target.value);
  };

  return (
    <div className="mx-auto border rounded p-4 max-w-xs">
      <div className="flex justify-center">
        <label htmlFor="gender-filter" className="pr-2">
          Gender:{" "}
        </label>
        <select
          id="gender-filter"
          value={selectedGender}
          onChange={handleGenderChange}
          className="border"
        >
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Both">Both</option>
        </select>
      </div>
    </div>
  );
}

export default ResultFilter;
