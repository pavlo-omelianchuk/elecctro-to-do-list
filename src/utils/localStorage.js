export const syncFromLocalStorage = () => {
  let keys = Object.keys(localStorage);
  for (let key of keys) {
    return localStorage.getItem("todoTasks") === null
      ? []
      : JSON.parse(localStorage.getItem(key));
  }
};

export const addToLocalStorage = (
  lsKey,
  id,
  content,
  isCompleted,
  timestamp
) => {
  let localStorageKey =
    localStorage.getItem(lsKey) === null
      ? []
      : JSON.parse(localStorage.getItem(lsKey));
  localStorageKey.push({ id, content, isCompleted, timestamp });
  localStorage.setItem(lsKey, JSON.stringify(localStorageKey));
};
export const updateToLocalStorage = (lsKey, todoTasks) => {
  localStorage.setItem(lsKey, JSON.stringify(todoTasks));
};
