/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { EditContext } from '../context/EditContext';

function TodoCard({ todo, setComplete, handleDelete }) {
  const { setEditTodo } = useContext(EditContext);
  const navigate = useNavigate();

  return (
    <div
      key={todo.id}
      className={
        !todo.complete
          ? 'flex justify-between mb-4 bg-blue-200 p-4 rounded-lg items-center font-bold text-xl flex-wrap flex-col sm:flex-row'
          : 'flex justify-between mb-4 bg-red-200 p-4 rounded-lg items-center font-bold text-xl flex-wrap flex-col sm:flex-row'
      }
    >
      <p
        className={
          todo.complete ? 'text-red-600 line-through' : 'text-blue-600'
        }
      >
        {todo.task}
      </p>
      <div className="flex gap-4 items-center my-4 sm:my-0">
        <label htmlFor="setComplete" className="sr-only">
          Done
        </label>
        <input
          aria-labelledby="setComplete"
          aria-label="isComplete"
          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          type="checkbox"
          name="setComplete"
          checked={todo.complete}
          onChange={setComplete}
        />
        <button
          className="focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-yellow-900"
          onClick={() => {
            setEditTodo(todo.task);
            navigate(`/update/${todo.id}`);
          }}
          type="button"
        >
          Edit
        </button>
        <button
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          onClick={() => handleDelete(todo.id)}
          type="button"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default TodoCard;
