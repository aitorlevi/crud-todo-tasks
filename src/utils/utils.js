import { PRIORITIES } from "./constants";
import { STATE } from "./constants";

export function getPriorities(id) {
  return (
    PRIORITIES.find((priority) => priority.id === id)?.value || "Sin prioridad"
  );
}

export function getPriorityColor(id) {
  switch (id) {
    case "low":
      return "text-green-400";
    case "medium":
      return "text-yellow-400";
    case "high":
      return "text-red-400";
    default:
      return "text-white";
  }
}

export function getState(id) {
  return STATE.find((status) => status.id === id)?.value || "Sin estado";
}

export function getTaskBackground(id) {
  switch (id) {
    case "pending":
      return "bg-yellow-400";
    case "inProgress":
      return "bg-blue-400";
    case "completed":
      return "bg-green-400";
    default:
      return "bg-white";
  }
}
