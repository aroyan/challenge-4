/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable function-paren-newline */
/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
import React, { useState, useEffect } from 'react';
import AddNewTodoButton from '../components/Buttons/AddNewTodoButton';
import DeleteButton from '../components/Buttons/DeleteButton';
import SelectForm from '../components/Forms/SelectForm';
import SearchForm from '../components/Forms/SearchForm';
import TodoCard from '../components/TodoCard';

function Home() {
  const [todos, setTodos] = useState(null);
  const [refetch, setRefetch] = useState(true);
  const [query, setQuery] = useState('');
  const [option, setOption] = useState('default');

  /**
   * `searchResult` variable is used to get data from search query
   * @return Array
   */
  const searchResult = todos?.filter((x) =>
    x.task?.toLowerCase().includes(query?.toLowerCase())
  );

  /**
   * `completedTodos` variable is used to get completed task data when the `done` option is selected
   * @return Array
   */
  const completedTodos = todos
    ?.filter((todo) => todo.complete === true)
    .filter((todo) => todo.task.toLowerCase().includes(query.toLowerCase()));

  /**
   * `uncompletedTodos` variable is used to get uncompleted task data
   *  when the `todo` option is selected
   * @return Array
   */
  const uncompletedTodos = todos
    ?.filter((todo) => todo.complete === false)
    .filter((todo) => todo.task.toLowerCase().includes(query.toLowerCase()));

  /**
   * `idCompletedTodos` variable is used to get all completed todos id
   * for delete done task functionality
   * @return Array
   */
  const idCompletedTodos = todos
    ?.filter((todo) => todo.complete === true)
    .map((todo) => todo.id);

  /**
   * `idAllTodos` variable is used to get all todos id for delete all task functionality
   * @return Array
   */
  const idAllTodos = todos?.map((todo) => todo.id);

  /**
   * `result` variable is will be mapped to display the actual todo list
   * @return Array
   */
  let result;

  if (option === 'completedTodos') {
    result = completedTodos;
  } else if (option === 'uncompletedTodos') {
    result = uncompletedTodos;
  } else {
    result = searchResult;
  }

  const handleGetTodos = async () => {
    const response = await fetch(import.meta.env.VITE_TODOS_API);
    const allTodos = await response.json();
    setTodos(allTodos);
    setRefetch(false);
  };

  const handleSetComplete = async (id, currentValue) => {
    await fetch(`${import.meta.env.VITE_TODOS_API}/${id}`, {
      method: 'PATCH',
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

  const handleDeleteDone = () => {
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
  };

  const handleDeleteAll = () => {
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
  };

  useEffect(() => {
    if (refetch) handleGetTodos();
  }, [refetch]);

  return (
    <div className="mt-8 mb-12 min-h-screen">
      <section className="flex justify-between">
        <AddNewTodoButton />
        <SelectForm setOption={setOption} disabled={!todos?.length} />
      </section>
      <SearchForm query={query} setQuery={setQuery} disabled={!todos?.length} />
      {todos ? (
        result?.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            handleDelete={handleDelete}
            setComplete={() => handleSetComplete(todo.id, todo.complete)}
          />
        ))
      ) : (
        <div className="h-screen">
          <p className="text-center">Loading....</p>
        </div>
      )}
      {!searchResult?.length && (
        <div className="h-screen text-center">
          {query ? (
            <p>{query} not found</p>
          ) : (
            <>
              <p className="text-2xl font-semibold">Yeay, no todo sofar.</p>
              <p className="text-2xl font-semibold mt-4 text-blue-800">
                Enjoy your day!
              </p>
            </>
          )}
        </div>
      )}
      {idCompletedTodos?.length > 0 && !query && option === 'default' ? (
        <DeleteButton handleDeleteFunc={handleDeleteDone}>
          Delete done tasks
        </DeleteButton>
      ) : null}{' '}
      {idAllTodos?.length > 0 && !query && option === 'default' ? (
        <DeleteButton handleDeleteFunc={handleDeleteAll}>
          Delete all tasks
        </DeleteButton>
      ) : null}
    </div>
  );
}

export default Home;
