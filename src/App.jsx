import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import { getTaskLists } from "./services";
import useModal from "./hooks/useModal";
import AddTask from "./components/AddTask";
import Modal from "./components/Modal";
import AddList from "./components/AddList";
import List from "./components/List";

function generateId() {
  return new Date().getTime();
}

function App() {
  const [taskLists, setTaskLists] = useState(getTaskLists);
  const { contentModal, openModal, closeModal } = useModal();

  useEffect(() => {
    localStorage.setItem("taskLists", JSON.stringify(taskLists));
  }, [taskLists]);

  function renderForm() {
    if (contentModal === "addTask") {
      return <AddTask taskLists={taskLists} onAddTask={addNewTask} />;
    } else if (contentModal === "addList") {
      return <AddList taskLists={taskLists} onAddList={addNewTaskList} />;
    }
  }

  function addNewTaskList(newTaskList) {
    newTaskList.tasks = [];
    newTaskList.id = generateId();
    newTaskList.order = taskLists.length + 1;
    setTaskLists([...taskLists, newTaskList]);
  }

  function addNewTask(newTask) {
    const taskListIndex = taskLists.findIndex(
      (list) => list.id === newTask.list
    );
    const newTaskList = { ...taskLists[taskListIndex] };
    newTask.id = generateId();
    newTask.order = newTaskList.length;
    newTaskList.tasks.push(newTask);
    setTaskLists((a) => [
      ...a.slice(0, taskListIndex),
      newTaskList,
      ...a.slice(taskListIndex + 1),
    ]);
  }

  return (
    <>
      <h1>TODO APP</h1>
      {taskLists.length > 0 ? (
        taskLists.map((list) => <List key={list.id} data={list} />)
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
