import { useState } from "react";
import { createContext } from "react";

export const EditContext = createContext("");

export default function EditContextProvider({ children }) {
  const [editTodo, setEditTodo] = useState("");

  return (
    <EditContext.Provider value={{ editTodo, setEditTodo }}>
      {children}
    </EditContext.Provider>
  );
}
