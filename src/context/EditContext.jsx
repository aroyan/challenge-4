/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import React, { useState, createContext } from 'react';

export const EditContext = createContext('');

export default function EditContextProvider({ children }) {
  const [editTodo, setEditTodo] = useState('');

  return (
    <EditContext.Provider value={{ editTodo, setEditTodo }}>
      {children}
    </EditContext.Provider>
  );
}
