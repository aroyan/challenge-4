import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { EditContext } from '../context/EditContext';

function Update() {
  const { editTodo } = useContext(EditContext);
  const [newTodo, setNewTodo] = useState(editTodo);

  const { id } = useParams();
  const navigate = useNavigate();

  const handleUpdate = async () => {
    await fetch(`${import.meta.env.VITE_TODOS_API}/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        task: newTodo,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((x) => {
      if (x.status === 200) navigate('/');
    });
  };

  return (
    <Layout>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mt-4 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Update this todo"
      />
      <button
        type="button"
        className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 mt-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:opacity-80"
        onClick={(e) => {
          e.preventDefault();
          handleUpdate();
        }}
        disabled={!editTodo}
      >
        Update Todo
      </button>
    </Layout>
  );
}

export default Update;
