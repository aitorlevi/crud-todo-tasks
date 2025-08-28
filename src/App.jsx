import { useState, useEffect } from "react";
import { getTaskLists } from "./services";
import useModal from "./hooks/useModal";
import CreateTask from "./components/CreateTask";
import Modal from "./components/Modal";
import CreateTaskList from "./components/CreateTaskList";
import TaskList from "./components/TaskList";

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
      (list) => list.id === newTask.list,
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
        <h1 className="header__title">Task Manager</h1>
        <div className="header__actions">
          <button
            className="btn btn--primary"
            type="button"
            onClick={() => openModal("createTask")}
          >
            Create Task
          </button>
          <button
            className="btn btn--primary"
            type="button"
            onClick={() => openModal("createList")}
          >
            Create Task List
          </button>
        </div>
      </header>
      <main className="main">
        {taskLists && taskLists.length > 0 ? (
          taskLists.map((list) => <TaskList key={list.id} data={list} />)
        ) : (
          <h2 cla>No pending tasks! 🔝🔝</h2>
        )}
        {contentModal && <Modal onClose={closeModal}>{renderForm()}</Modal>}
      </main>
    </>
  );
}

export default App;
