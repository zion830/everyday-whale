export const getLocalStorageItem = ({ key, defalutValue }) => {
  try {
    const storedItem = localStorage.getItem(key);
    return storedItem ? storedItem : defalutValue;
  } catch (e) {
    console.error(e);
    return defalutValue;
  }
};

export const getLocalStorageJSONItem = ({ key, defalutValue }) => {
  try {
    const storedItem = localStorage.getItem(key);
    return storedItem ? JSON.parse(storedItem) : defalutValue;
  } catch (e) {
    console.error(e);
    return defalutValue;
  }
};

export const setLocalStorageItem = ({ key, item }) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(item));
  } catch (e) {
    console.error(e);
  }
};
