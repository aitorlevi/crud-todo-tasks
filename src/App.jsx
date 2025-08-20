import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import getTodos from "./services";

function App() {
  const [todos, setTodos] = useState(() => getTodos());

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <h1>TODO APP</h1>
      {todos.length > 0 ? (
        todos.map((list) => {
          <h2>{list.name}</h2>;
        })
      ) : (
        <h2>No hay nada pendiente</h2>
      )}
    </>
  );
}

export default App;
