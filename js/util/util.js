import { LEVEL_SETTING } from "./constants.js";

export const getDateStr = () => {
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export const getWhaleStatus = (level) => {
  for (let i = 0; i < LEVEL_SETTING.length; i++) {
    if (level < LEVEL_SETTING[i]) {
      return i;
    }
  }
};
