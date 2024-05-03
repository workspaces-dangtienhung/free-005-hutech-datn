// set to localStorage function
export const setLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// get from localStorage function
export const getLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

// remove from localStorage function
export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
