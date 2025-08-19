import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  // const [todos, setTodos] = useState([]);

  // useEffect(() => {
  //   let savedTodos = localStorage.getItem("todos");
  //   console.log(savedTodos);
  //   setTodos(savedTodos ? JSON.parse(savedTodos) : []);
  // }, []);

  // useEffect(() => {
  //   setTodos(localStorage.setItem("todos", JSON.stringify(todos)));
  // }, [todos]);

  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

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
