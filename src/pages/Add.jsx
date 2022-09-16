import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

function Add() {
  const [newTodo, setNewTodo] = useState('');

  const navigate = useNavigate();

  const handleAdd = async () => {
    await fetch(import.meta.env.VITE_TODOS_API, {
      method: 'POST',
      body: JSON.stringify({
        task: newTodo,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    }).then((x) => {
      if (x.status === 201) {
        navigate('/');
      }
    });
  };

  return (
    <Layout>
      <section className="flex h-[calc(100vh-136px)] justify-center items-center">
        <form className="mt-8" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            id="todo"
            className="block p-4 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Add todo"
            required
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button
            type="button"
            className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 mt-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:opacity-80"
            onClick={(e) => {
              e.preventDefault();
              handleAdd();
            }}
            disabled={!newTodo}
          >
            Add Todo
          </button>
        </form>
      </section>
    </Layout>
  );
}

export default Add;
