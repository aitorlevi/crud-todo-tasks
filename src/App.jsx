import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import { getTodos, getPriorities } from "./services";
import useModal from "./hooks/useModal";
import AddTask from "./components/AddTask";
import Modal from "./components/Modal";

function App() {
  const [todos, setTodos] = useState(() => getTodos());
  const [priorities, setPriorities] = useState(() => getPriorities());
  const { contentModal, openModal, closeModal } = useModal();

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("priorities", JSON.stringify(priorities));
  }, [priorities]);

  function renderForm() {
    if (contentModal === "add") {
      return <AddTask priorities={priorities} />;
    }
  }

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
      <button type="button" onClick={() => openModal("add")}>
        Añadir tarea
      </button>

      {contentModal && <Modal onClose={closeModal}>{renderForm()}</Modal>}
    </>
  );
}

export default App;
