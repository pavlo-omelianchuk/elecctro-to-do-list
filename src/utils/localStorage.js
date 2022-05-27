export const syncFromLocalStorage = (lsKey) => {
  let keys = Object.keys(localStorage);
  console.log(keys);
  for (let key of keys) {
    return localStorage.getItem(lsKey) === null
      ? []
      : JSON.parse(localStorage.getItem(lsKey));
  }
};

export const addToLocalStorage = (lsKey, newItem) => {
  let localStorageKey =
    localStorage.getItem(lsKey) === null
      ? []
      : JSON.parse(localStorage.getItem(lsKey));
  localStorageKey.push(newItem);
  localStorage.setItem(lsKey, JSON.stringify(localStorageKey));
};
export const updateToLocalStorage = (lsKey, todoTasks) => {
  localStorage.setItem(lsKey, JSON.stringify(todoTasks));
};
