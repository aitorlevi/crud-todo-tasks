export function getTaskLists() {
  const savedtaskLists = localStorage.getItem("taskLists");
  return savedtaskLists ? JSON.parse(savedtaskLists) : [];
}

export function getLists() {
  const taskLists = localStorage.getItem("taskLists");
  if (taskLists) {
    let parsedtaskLists = JSON.parse(taskLists);
    return parsedtaskLists.length > 0 ? parsedtaskLists : [];
  } else {
    return [];
  }
}
