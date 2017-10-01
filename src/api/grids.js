/**
 *
 */
const STORAGE_KEY = '_grids';
const TIMEOUT = 200

export default {

  fetchGrids: (callback, timeout) => {
  	let data = JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || [];
  	setTimeout(() => callback(data), timeout || TIMEOUT);
  },

  updateGrids: (data, callback, timeout) => {
  	window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  	setTimeout(() => callback(), timeout || TIMEOUT)
  }

};
