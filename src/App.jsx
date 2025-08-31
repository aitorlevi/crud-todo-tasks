import { useState, useEffect } from "react";
import { getTaskLists } from "./services";
import useModal from "./hooks/useModal";
import CreateTask from "./components/CreateTask";
import Modal from "./components/Modal";
import CreateTaskList from "./components/CreateTaskList";
import TaskList from "./components/TaskList";
import Button from "./components/Button";

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
    } else if (contentModal === "createTaskList") {
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
    closeModal();
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
    closeModal();
  }

  return (
    <>
      <header className="flex w-full flex-col items-center justify-center">
        <h1 className="my-8 text-5xl">Task Manager</h1>
        <div className="flex gap-4">
          <Button
            children="Crear tarea"
            type="button"
            onClick={() => openModal("createTask")}
          />
          <Button
            children="Crear lista de tareas"
            type="button"
            onClick={() => openModal("createTaskList")}
          />
        </div>
      </header>
      <main className="flex flex-col items-center gap-6 overflow-x-auto p-6">
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
