import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import { getTodos, getPriorities, getLists } from "./services";
import useModal from "./hooks/useModal";
import AddTask from "./components/AddTask";
import Modal from "./components/Modal";
import AddList from "./components/AddList";

function App() {
  const [lists, setLists] = useState(() => getTodos());
  const { contentModal, openModal, closeModal } = useModal();

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(lists));
  }, [lists]);

  function renderForm() {
    if (contentModal === "addTask") {
      return <AddTask />;
    } else if (contentModal === "addList") {
      return <AddList />;
    }
  }

  return (
    <>
      <h1>TODO APP</h1>
      {lists && lists.length >= 3 ? (
        lists.map((list) => {
          <h2>{list.title}</h2>;
        })
      ) : (
        <h2>No hay nada pendiente</h2>
      )}
      <button type="button" onClick={() => openModal("addTask")}>
        Añadir tarea
      </button>
      <button type="button" onClick={() => openModal("addList")}>
        Añadir lista
      </button>

      {contentModal && <Modal onClose={closeModal}>{renderForm()}</Modal>}
    </>
  );
}

export default App;
