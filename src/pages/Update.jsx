import React, { useContext, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { EditContext } from '../context/EditContext';
import Layout from '../components/Layout';

function Update() {
  const { editTodo, setEditTodo } = useContext(EditContext);
  const [newTodo, setNewTodo] = useState(editTodo);

  const { id } = useParams();
  const navigate = useNavigate();

  const handleUpdate = async () => {
    await fetch(`${import.meta.env.VITE_TODOS_API}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        task: newTodo,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((x) => {
      if (x.status === 200) {
        navigate('/');
        setEditTodo('');
      }
    });
  };

  return (
    <Layout>
      {editTodo ? (
        <section className="h-[calc(100vh-120px)] flex items-center justify-center flex-col">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (newTodo) {
                handleUpdate();
              }
            }}
          >
            <input
              type="text"
              value={newTodo}
              onChange={(event) => setNewTodo(event.target.value)}
              className="block p-4 pl-4 w-[340px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Update this todo"
            />
            <button
              type="button"
              className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 mt-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:opacity-80"
              onClick={(event) => {
                event.preventDefault();
                handleUpdate();
              }}
              disabled={!editTodo || !newTodo}
            >
              Update Todo
            </button>
          </form>
        </section>
      ) : (
        <section className="h-[calc(100vh-136px)] flex items-center justify-center flex-col gap-4">
          <p className="font-bold text-2xl">Item not found</p>
          <Link
            className="px-8 py-3 font-semibold rounded bg-blue-700 text-white"
            to="/"
          >
            Back to homepage
          </Link>
        </section>
      )}
    </Layout>
  );
}

export default Update;
