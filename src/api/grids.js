/**
 *
 */
const STORAGE_KEY = '_grids';
const TIMEOUT = 200

export default {

  fetchGrids: (timeout = TIMEOUT) => {
    const data = JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || [];
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, timeout);
    });
  },

  updateGrids: (data, timeout = TIMEOUT) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      }, timeout);
    });
  }

};
