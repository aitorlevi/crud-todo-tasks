export function getTodos() {
  const savedTodos = localStorage.getItem("todos");
  return savedTodos ? JSON.parse(savedTodos) : [];
}

export function getLists() {
  const todos = localStorage.getItem("todos");
  if (todos) {
    let parsedTodos = JSON.parse(todos);
    return parsedTodos.length > 0 ? parsedTodos : [];
  } else {
    return [];
  }
}
