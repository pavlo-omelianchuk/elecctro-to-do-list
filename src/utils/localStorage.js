export const syncFromLocalStorage = () => {
  let storageTasks;
  storageTasks =
    localStorage.getItem("storageTasks") === null
      ? []
      : JSON.parse(localStorage.getItem("storageTasks"));
  this.setState({ tasks: storageTasks });
};

export const syncToLocalStorage = (content, isCompleted, timestamp) => {
  let storageTasks;
  storageTasks =
    localStorage.getItem("storageTasks") === null
      ? []
      : JSON.parse(localStorage.getItem("storageTasks"));
  storageTasks.push({ content, isCompleted, timestamp });
  localStorage.setItem("storageTasks", JSON.stringify(storageTasks));
};
