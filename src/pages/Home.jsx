import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { initialTodos } from "../data/todo";
import { EditContext } from "../context/EditContext";

const Home = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [completed, setCompleted] = useState(false);
  const { editTodo, setEditTodo } = useContext(EditContext);
  const navigate = useNavigate();
  console.log(editTodo);

  return (
    <>
      <h1 className="font-bold text-3xl text-center">Todos</h1>
      <button className="bg-blue-600 text-white p-2 rounded-md">
        <Link to="/add">Add New Todo</Link>
      </button>
      {todos?.map((todo) => (
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
                navigate("/update");
              }}
            >
              Edit
            </button>
            <button className="bg-red-600 text-white p-2">Remove</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Home;

// completed
//         ? todos
//             .filter((item) => item.complete === false)
//             .map((todo) => (
//               <p
//                 key={todo.id}
//                 className={
//                   todo.complete ? "text-red-600 line-through" : "text-blue-600"
//                 }
//               >
//                 {todo.task}
//               </p>
//             ))
