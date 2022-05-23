export const syncFromLocalStorage = () => {
  let toToTasks;
  toToTasks =
    localStorage.getItem("toToTasks") === null
      ? []
      : JSON.parse(localStorage.getItem("toToTasks"));
  return toToTasks;
};

export const syncToLocalStorage = (id, content, isCompleted, timestamp) => {
  let toToTasks;
  toToTasks =
    localStorage.getItem("toToTasks") === null
      ? []
      : JSON.parse(localStorage.getItem("toToTasks"));
  toToTasks.push({ id, content, isCompleted, timestamp });
  localStorage.setItem("toToTasks", JSON.stringify(toToTasks));
};
