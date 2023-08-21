import React from 'react';

const SizeQtyChooser = ({ availableSizes }) => {
  return (
    <div className="flex items-center my-6 px-4">
      <select
        className="w-full py-2 px-4 border rounded-md"
      >
        {availableSizes.length === 0 ? (
          <option value="">OUT OF STOCK</option>
        ) : (
          <>
            <option value="">Select Size</option>
            {availableSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </>
        )}
      </select>
    </div>
  );
};

export default SizeQtyChooser;
