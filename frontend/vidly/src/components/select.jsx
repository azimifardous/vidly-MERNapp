import React from "react";

const Select = ({ name, label, options, error, ...rest }) => {
  return (
    <div className="mb-6 w-1/4">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <select
        name={name}
        id={name}
        {...rest}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pl-4"
      >
        <option value="" />
        {options.map((option) => {
          return (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          );
        })}
      </select>
      {error && (
        <p
          id="standard_error_help"
          className="mt-2 text-xs text-red-600 dark:text-red-400"
        >
          <span className="font-medium">Oh, snapp!</span> {error}
        </p>
      )}
    </div>
  );
};

export default Select;
