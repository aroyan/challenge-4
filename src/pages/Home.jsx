/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable comma-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable function-paren-newline */

import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EditContext } from '../context/EditContext';

function Home() {
  const [todos, setTodos] = useState(null);
  const [refetch, setRefetch] = useState(true);
  const [query, setQuery] = useState('');
  const [option, setOption] = useState('all');

  const { setEditTodo } = useContext(EditContext);
  const navigate = useNavigate();

  // prettier-ignore
  const searchResult = todos?.filter((x) =>
    x.task.toLowerCase().includes(query.toLowerCase())
  );
  const completedTodos = todos
    ?.filter((todo) => todo.complete === true)
    .filter((todo) => todo.task.toLowerCase().includes(query.toLowerCase()));
  const uncompletedTodos = todos
    ?.filter((todo) => todo.complete === false)
    .filter((todo) => todo.task.toLowerCase().includes(query.toLowerCase()));

  const idCompletedTodos = todos
    ?.filter((todo) => todo.complete === true)
    .map((todo) => todo.id);

  const idAllTodos = todos?.map((todo) => todo.id);

  let result;

  if (option === 'completedTodos') {
    result = completedTodos;
  } else if (option === 'uncompletedTodos') {
    result = uncompletedTodos;
  } else {
    result = searchResult;
  }

  const getTodos = async () => {
    const response = await fetch(import.meta.env.VITE_TODOS_API);
    const allTodos = await response.json();
    setTodos(allTodos);
    setRefetch(false);
  };

  const setComplete = async (id, currentValue) => {
    await fetch(`${import.meta.env.VITE_TODOS_API}/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        complete: !currentValue,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      setRefetch(true);
    });
  };

  const handleDelete = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_TODOS_API}/${id}`, {
      method: 'DELETE',
    });
    const resultDelete = await response.status;
    if (resultDelete === 200) setRefetch(true);
  };

  useEffect(() => {
    if (refetch) getTodos();
  }, [refetch]);

  return (
    <div className="mt-8 mb-12 min-h-screen">
      <section className="flex justify-between">
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          type="button"
        >
          <Link to="/add">Add New Todo</Link>
        </button>
        <form>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-32 p-2.5 dark:bg-gray-700 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 border-r-8 border-solid cursor-pointer"
            onChange={(event) => setOption(event.target.value)}
          >
            <option value="all">All</option>
            <option value="completedTodos">Done</option>
            <option value="uncompletedTodos">Todo</option>
          </select>
        </form>
      </section>

      <form className="my-6">
        {/*  eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
        >
          Search
        </label>
        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            name="default-search"
            className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Todos"
            value={query}
            // prettier-ignore
            onChange={(event) => setQuery(event.target.value)}
            required
          />
        </div>
      </form>

      {todos ? (
        result?.map((todo) => (
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
                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                type="checkbox"
                name="setComplete"
                checked={todo.complete}
                onChange={() => setComplete(todo.id, todo.complete)}
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
        ))
      ) : (
        <div className="h-screen">
          <p className="text-center">Loading....</p>
        </div>
      )}

      {!searchResult?.length && (
        <div className="h-screen">
          <p className="text-center">{query} not found</p>
        </div>
      )}

      {idCompletedTodos?.length > 0 && !query ? (
        <button
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          onClick={() => {
            Promise.all(
              idCompletedTodos.map((id) =>
                fetch(`${import.meta.env.VITE_TODOS_API}/${id}`, {
                  method: 'DELETE',
                })
                  .then((res) => res)
                  .then((data) => data.status)
              )
            ).then((res) => {
              if (res.every((code) => code === 200)) setRefetch(true);
            });
          }}
          type="button"
        >
          Delete done tasks
        </button>
      ) : null}

      {idAllTodos?.length > 0 && !query ? (
        <button
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-4 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          onClick={() => {
            Promise.all(
              idAllTodos.map((id) =>
                fetch(`${import.meta.env.VITE_TODOS_API}/${id}`, {
                  method: 'DELETE',
                })
                  .then((res) => res)
                  .then((data) => data.status)
              )
            ).then((res) => {
              if (res.every((code) => code === 200)) setRefetch(true);
            });
          }}
          type="button"
        >
          Delete all tasks
        </button>
      ) : null}
    </div>
  );
}

export default Home;
