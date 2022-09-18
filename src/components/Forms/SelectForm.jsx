import React from 'react';
import { useNavigate } from 'react-router-dom';

function SelectForm({ setOption, disabled }) {
  const navigate = useNavigate();

  return (
    <form>
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-32 p-2.5 dark:bg-gray-700 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer"
        onChange={(event) => {
          setOption(event.target.value);
          if (event.target.value === 'default') {
            navigate('/');
          } else {
            navigate(`?filterby=${event.target.value}`);
          }
        }}
        disabled={disabled}
      >
        <option value="default">All</option>
        <option value="completedTodos">Done</option>
        <option value="uncompletedTodos">Todo</option>
      </select>
    </form>
  );
}

export default SelectForm;
