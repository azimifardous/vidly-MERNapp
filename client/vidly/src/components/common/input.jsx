import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="mb-6 w-1/4">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        {...rest}
        name={name}
        id={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
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

export default Input;
