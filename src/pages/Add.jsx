import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

function Add() {
  const [newTodo, setNewTodo] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(false);
        navigate('/');
      }
    });
  };

  useEffect(() => {
    document.title = 'Add Todo | To-do-do';
  }, []);

  return (
    <Layout>
      <section className="flex h-[calc(100vh-120px)] justify-center items-center">
        <form
          className="mt-8 w-full flex flex-col justify-center items-center gap-3"
          onSubmit={(event) => {
            setIsLoading(true);
            event.preventDefault();
            if (newTodo) {
              handleAdd();
            }
          }}
        >
          <input
            type="text"
            id="todo"
            className="block p-4 pl-4 w-[340px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Add todo"
            required
            value={newTodo}
            onChange={(event) => setNewTodo(event.target.value)}
            disabled={isLoading}
          />
          <button
            type="button"
            className="text-white w-[340px] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:opacity-80"
            onClick={(event) => {
              event.preventDefault();
              setIsLoading(true);
              handleAdd();
            }}
            disabled={!newTodo || isLoading}
          >
            {isLoading ? 'Submitting' : 'Add Todo'}
          </button>
        </form>
      </section>
    </Layout>
  );
}

export default Add;
