import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import { getTaskLists } from "./services";
import useModal from "./hooks/useModal";
import CreateTask from "./components/CreateTask";
import Modal from "./components/Modal";
import CreateTaskList from "./components/CreateTaskList";
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
    if (contentModal === "createTask") {
      return <CreateTask taskLists={taskLists} onCreateTask={createTask} />;
    } else if (contentModal === "createList") {
      return (
        <CreateTaskList
          taskLists={taskLists}
          onCreateTaskList={createTaskList}
        />
      );
    }
  }

  function createTaskList(newTaskList) {
    newTaskList.tasks = [];
    newTaskList.id = generateId();
    newTaskList.order = taskLists.length + 1;
    setTaskLists([...taskLists, newTaskList]);
  }

  function createTask(newTask) {
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
      <header className="header">
        <h1>Task Manager</h1>
      </header>

      {taskLists.length > 0 ? (
        taskLists.map((list) => <List key={list.id} data={list} />)
      ) : (
        <h2>No hay nada pendiente</h2>
      )}
      <button type="button" onClick={() => openModal("createTask")}>
        Create Task
      </button>
      <button type="button" onClick={() => openModal("createList")}>
        Create List
      </button>
      {contentModal && <Modal onClose={closeModal}>{renderForm()}</Modal>}
    </>
  );
}

export default App;
