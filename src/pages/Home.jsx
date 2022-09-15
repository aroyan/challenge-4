import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EditContext } from "../context/EditContext";

const Home = () => {
  const [todos, setTodos] = useState(null);
  const [refetch, setRefetch] = useState(true);
  const [query, setQuery] = useState("");
  const searchResut = todos?.filter((x) =>
    x.task.toLowerCase().includes(query.toLowerCase())
  );

  const { editTodo, setEditTodo } = useContext(EditContext);
  const navigate = useNavigate();

  const getTodos = async () => {
    const response = await fetch(import.meta.env.VITE_TODOS_API);
    const result = await response.json();
    setTodos(result);
    setRefetch(false);
  };

  const setComplete = async (id, currentValue) => {
    await fetch(`${import.meta.env.VITE_TODOS_API}/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        complete: !currentValue,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      setRefetch(true);
    });
  };

  useEffect(() => {
    if (refetch) getTodos();
  }, [refetch]);

  return (
    <div className="mt-8 mb-12">
      <button className="bg-blue-600 text-white p-2 rounded-md">
        <Link to="/add">Add New Todo</Link>
      </button>
      <form className="my-6">
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
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            name="default-search"
            className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Todos"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
          />
        </div>
      </form>

      {todos ? (
        searchResut?.map((todo) => (
          <div
            key={todo.id}
            className={
              !todo.complete
                ? "flex justify-between mb-4 bg-blue-200 p-4 rounded-lg items-center font-bold text-xl flex-wrap"
                : "flex justify-between mb-4 bg-red-200 p-4 rounded-lg items-center font-bold text-xl flex-wrap"
            }
          >
            <p
              className={
                todo.complete ? "text-red-600 line-through" : "text-blue-600"
              }
            >
              {todo.task}
            </p>
            <div className="flex gap-4 items-center">
              <input
                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                type="checkbox"
                name="setComplete"
                id="setComplete"
                checked={todo.complete}
                onChange={() => setComplete(todo.id, todo.complete)}
              />
              <button
                className="focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-yellow-900"
                onClick={() => {
                  setEditTodo(todo.task);
                  navigate(`/update/${todo.id}`);
                }}
              >
                Edit
              </button>
              <button
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                onClick={async () => {
                  await fetch(`${import.meta.env.VITE_TODOS_API}/${todo.id}`, {
                    method: "DELETE",
                  }).then(() => setRefetch(true));
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>Loading....</p>
      )}
    </div>
  );
};

export default Home;
