import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EditContext } from "../context/EditContext";

const Home = () => {
  const [todos, setTodos] = useState(null);
  const [completed, setCompleted] = useState(false);
  const { editTodo, setEditTodo } = useContext(EditContext);
  const [refetch, setRefetch] = useState(true);
  const navigate = useNavigate();

  const getTodos = async () => {
    const response = await fetch(import.meta.env.VITE_TODOS_API);
    const result = await response.json();
    setTodos(result);
    setRefetch(false);
  };

  useEffect(() => {
    if (refetch) getTodos();
  }, [refetch]);

  return (
    <>
      <h1 className="font-bold text-3xl text-center">Todos</h1>
      <button className="bg-blue-600 text-white p-2 rounded-md">
        <Link to="/add">Add New Todo</Link>
      </button>
      {todos ? (
        todos?.map((todo) => (
          <div key={todo.id} className="flex justify-between mb-4">
            <p
              className={
                todo.complete ? "text-red-600 line-through" : "text-blue-600"
              }
            >
              {todo.task}
            </p>
            <div className="flex gap-4">
              <input
                type="checkbox"
                name="setComplete"
                id="setComplete"
                checked={todo.complete}
                onChange={() => !todo.complete}
              />
              <button
                className="bg-green-600 text-white p-2"
                onClick={() => {
                  setEditTodo(todo.task);
                  navigate(`/update/${todo.id}`);
                }}
              >
                Edit
              </button>
              <button
                className="bg-red-600 text-white p-2"
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
    </>
  );
};

export default Home;
