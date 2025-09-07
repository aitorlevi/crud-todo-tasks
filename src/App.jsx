import { useState, useEffect } from "react";
import { getTaskLists } from "./services";
import useModal from "./hooks/useModal";
import CreateTask from "./components/CreateTask";
import Modal from "./components/Modal";
import CreateTaskList from "./components/CreateTaskList";
import TaskList from "./components/TaskList";
import Button from "./components/Button";
import TaskContext from "./contexts/TaskContext";

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
    const taskList = { ...taskLists[taskListIndex] };
    newTask.id = generateId();
    newTask.order = taskList.length;
    newTask.date = new Date().toISOString();
    newTask.status = "pending";
    taskList.tasks.push(newTask);
    setTaskLists((a) => [
      ...a.slice(0, taskListIndex),
      taskList,
      ...a.slice(taskListIndex + 1),
    ]);
    closeModal();
  }

  // TODO No funciona bien
  function updateTask(updatedTask) {
    let taskListId;
    for (let list of taskLists) {
      if (list.tasks.find((task) => task.id === updatedTask.id)) return list.id;
    }
    const taskListIndex = taskLists.findIndex(
      (list) => list.id === updatedTask.list,
    );
    const taskList = { ...taskLists[taskListIndex] };
    const taskIndex = taskList.tasks.findIndex(
      (task) => task.id === updateTask.id,
    );
    if (taskListId === updatedTask.list) {
      taskList.tasks[taskIndex] = updatedTask;
      setTaskLists((a) => [
        ...a.slice(0, taskListIndex),
        taskList,
        ...a.slice(taskListIndex + 1),
      ]);
    } else {
      taskList.tasks.splice(taskIndex, 1);
      setTaskLists((a) => [
        ...a.slice(0, taskListIndex),
        taskList,
        ...a.slice(taskListIndex + 1),
      ]);
      const newTaskListIndex = taskLists.findIndex(
        (list) => list.id === updateTask.list,
      );
      const newTaskList = { ...taskLists[newTaskListIndex] };
      newTaskList.tasks.push(updateTask);
      setTaskLists((a) => [
        ...a.slice(0, taskListIndex),
        newTaskList,
        ...a.slice(taskListIndex + 1),
      ]);
    }
    closeModal();
  }

  return (
    <TaskContext.Provider value={{ taskLists, updateTask }}>
      <header className="bg-background-main sticky top-0 z-10 flex w-full flex-col items-center justify-center px-8 pb-4">
        <h1 className="my-5 text-center text-5xl">Task Manager</h1>
        <div className="flex flex-wrap justify-center gap-4">
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
      </main>
      {contentModal && <Modal onClose={closeModal}>{renderForm()}</Modal>}
    </TaskContext.Provider>
  );
}

export default App;
