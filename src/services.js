export function getTodos() {
  const savedTodos = localStorage.getItem("todos");
  return savedTodos ? JSON.parse(savedTodos) : [];
}

export function getPriorities() {
  const priorities = localStorage.getItem("priorities");
  return priorities ? JSON.parse(priorities) : [];
}
