import Layout from "../components/Layout";
import { useState, useContext } from "react";
import { EditContext } from "../context/EditContext";

const Add = () => {
  const [newTodo, setNewTodo] = useState("");
  const { editTodo, setEditTodo } = useContext(EditContext);
  console.log(editTodo);

  return (
    <Layout>
      {editTodo}
      <form className="mt-8" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          id="todo"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Add todo"
          required
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button
          type="button"
          className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 mt-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:opacity-80"
          onClick={() => {
            console.log(newTodo);
            setNewTodo("");
          }}
          disabled={newTodo ? false : true}
        >
          Add Todo
        </button>
      </form>
    </Layout>
  );
};

export default Add;