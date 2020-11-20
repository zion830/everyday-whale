export const getLocalStorageItem = ({ key, defalutValue }) => {
  try {
    const storedItem = window.localStorage.getItem(key);
    return storedItem ? storedItem : defalutValue;
  } catch (e) {
    console.error(e);
    alert("데이터를 가져오는데 문제가 발생했습니다!");
    return defalutValue;
  }
};

export const getLocalStorageJSONItem = ({ key, defalutValue }) => {
  try {
    const storedItem = window.localStorage.getItem(key);
    return storedItem ? JSON.parse(storedItem) : defalutValue;
  } catch (e) {
    console.error(e);
    alert("데이터를 가져오는데 문제가 발생했습니다!");
    return defalutValue;
  }
};

export const setLocalStorageItem = ({ key, item }) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(item));
  } catch (e) {
    alert("데이터를 저장하는데 문제가 발생했습니다!");
    console.error(e);
  }
};

export const removeLocalStorageItem = ({ keys }) => {
  try {
    keys.forEach((key) => {
      window.localStorage.removeItem(key);
    });
  } catch (e) {
    alert("데이터를 삭제하는데 문제가 발생했습니다!");
    console.error(e);
  }
};
