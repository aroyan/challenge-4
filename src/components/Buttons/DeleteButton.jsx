import React from 'react';

function DeleteButton({ handleDeleteFunc, children, disabled }) {
  return (
    <button
      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      onClick={handleDeleteFunc}
      type="button"
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default DeleteButton;
