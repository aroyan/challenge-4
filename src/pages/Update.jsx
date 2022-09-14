import Layout from "../components/Layout";
import { useContext, useState } from "react";
import { EditContext } from "../context/EditContext";

const Update = () => {
  const [newTodo, setNewTodo] = useState("");
  const { editTodo, setEditTodo } = useContext(EditContext);

  return (
    <Layout>
      <input
        type="text"
        value={editTodo}
        onChange={(e) => setEditTodo(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mt-4 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Update this todo"
      />
      <button
        type="button"
        className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 mt-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:opacity-80"
        onClick={() => {
          console.log(editTodo);
        }}
        disabled={editTodo ? false : true}
      >
        Update Todo
      </button>
    </Layout>
  );
};

export default Update;
