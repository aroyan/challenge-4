import { useState } from "react";
import { createContext } from "react";

export const EditContext = createContext("Nilai awal");

export default function EditContextProvider({ children }) {
  const [editTodo, setEditTodo] = useState("Inisial");

  return (
    <EditContext.Provider value={{ editTodo, setEditTodo }}>
      {children}
    </EditContext.Provider>
  );
}
