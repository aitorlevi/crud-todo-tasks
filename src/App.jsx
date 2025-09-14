import { useState, useEffect } from "react";
import { getTaskLists } from "./services";
import useModal from "./hooks/useModal";
import CreateTask from "./components/CreateTask";
import Modal from "./components/Modal";
import CreateTaskList from "./components/CreateTaskList";
import TaskList from "./components/TaskList";
import Button from "./components/Button";
import { TaskContext } from "./contexts/TaskContext";

function generateId() {
  return new Date().getTime();
}

function findListIndexById(lists, id) {
  return lists.findIndex((list) => list.id === id);
}

function cloneTaskList(list) {
  return { ...list, tasks: [...list.tasks] };
}

function removeTaskFromList(list, taskId) {
  return { ...list, tasks: list.tasks.filter((task) => task.id !== taskId) };
}

function addTaskToList(list, task) {
  return { ...list, tasks: [...list.tasks, task] };
}

function moveTaskBetweenLists(lists, oldListIndex, newListIndex, updatedTask) {
  const updatedLists = [...lists];
  // Remove from old list
  updatedLists[oldListIndex] = removeTaskFromList(
    updatedLists[oldListIndex],
    updatedTask.id,
  );
  // Add to new list
  updatedLists[newListIndex] = addTaskToList(
    updatedLists[newListIndex],
    updatedTask,
  );
  return updatedLists;
}

function App() {
  const [taskLists, setTaskLists] = useState(getTaskLists);
  const { contentModal, openModal, closeModal } = useModal();

  useEffect(() => {
    localStorage.setItem("taskLists", JSON.stringify(taskLists));
  }, [taskLists]);

  function renderForm() {
    if (contentModal === "createTask") {
      return (
        <CreateTask
          taskLists={taskLists}
          onCreateTask={createTask}
          onClose={closeModal}
        />
      );
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
    setTaskLists((prevLists) => {
      const taskListIndex = findListIndexById(prevLists, newTask.list);
      if (taskListIndex === -1) return prevLists;
      const updatedLists = [...prevLists];
      const taskList = cloneTaskList(updatedLists[taskListIndex]);
      newTask.id = generateId();
      newTask.order = taskList.tasks.length;
      newTask.date = new Date().toISOString();
      taskList.tasks.push(newTask);
      updatedLists[taskListIndex] = taskList;
      return updatedLists;
    });
    closeModal();
  }

  function updateTask(updatedTask) {
    setTaskLists((prevLists) => {
      const oldListIndex = prevLists.findIndex((list) =>
        list.tasks.some((task) => task.id === updatedTask.id),
      );
      const newListIndex = findListIndexById(prevLists, updatedTask.list);
      if (oldListIndex === -1 || newListIndex === -1) return prevLists;
      if (oldListIndex === newListIndex) {
        // Update in place
        const updatedLists = [...prevLists];
        const list = cloneTaskList(updatedLists[oldListIndex]);
        const taskIndex = list.tasks.findIndex(
          (task) => task.id === updatedTask.id,
        );
        if (taskIndex !== -1) list.tasks[taskIndex] = updatedTask;
        updatedLists[oldListIndex] = list;
        return updatedLists;
      } else {
        // Move between lists
        return moveTaskBetweenLists(
          prevLists,
          oldListIndex,
          newListIndex,
          updatedTask,
        );
      }
    });
    return true;
  }

  function deleteTask(taskToDelete) {
    setTaskLists((prevLists) => {
      const taskListIndex = findListIndexById(prevLists, taskToDelete.list);
      if (taskListIndex === -1) return prevLists;
      const updatedLists = [...prevLists];
      updatedLists[taskListIndex] = removeTaskFromList(
        updatedLists[taskListIndex],
        taskToDelete.id,
      );
      return updatedLists;
    });
  }

  return (
    <TaskContext.Provider value={{ taskLists, updateTask, deleteTask }}>
      <header className="bg-background-main sticky top-0 z-10 flex w-full flex-col items-center justify-center px-8 pb-4 lg:flex-row lg:justify-between">
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
      <main className="flex flex-col items-center overflow-x-auto p-6 lg:flex-row lg:items-start">
        {taskLists && taskLists.length > 0 ? (
          taskLists.map((list) => <TaskList key={list.id} data={list} />)
        ) : (
          <h2>No pending tasks! 🔝🔝</h2>
        )}
      </main>
      {contentModal && <Modal onClose={closeModal}>{renderForm()}</Modal>}
    </TaskContext.Provider>
  );
}

export default App;
