import api from '../api/grids'
import * as types from '../constants/ActionTypes'


/**
 * Generic grid actions
 */

const _loadGrids = (data) => ({
  type: types.LOAD_GRIDS,
  grids: data
});

export const loadGrids = () => dispatch => {
  api.fetchGrids().then((data) => {
    dispatch(_loadGrids(data));
  });
};

const _addGrid = (title) => ({
  type: types.ADD_GRID,
  title: title
});

export const addGrid = title => (dispatch, getState) => {
  const data = getState().grids || [];
  if (!data.find(g => g.title === title)) {
    dispatch(_addGrid(title));
    api.updateGrids(getState().grids).then((success) => {
      // TODO
    });
  }
};

const _removeGrid = title => ({
  type: types.REMOVE_GRID,
  title: title
});

export const removeGrid = title => (dispatch, getState) => {
  if (!getState().grids.find(g => g.title === title)) {
    dispatch(_removeGrid(title));
  }
};

const _updateGrids = (data) => ({
  type: types.UPDATE_GRIDS,
  grids: data
});

export const updateGrids = () => (dispatch, getState) => {
  dispatch(_updateGrids(getState().grids));
};

/**
 * Stock specific actions
 */

const _addStockToGrid = (title, symbol) => ({
  type: types.ADD_STOCK,
  title: title,
  symbol: symbol
});

export const addStockToGrid = (title, symbol) => (dispatch, getState) => {
  const grid = getState().grids.find(g => g.title === title);
  if (grid || false && grid.symbols.indexOf(symbol) === -1) {
    dispatch(_addStockToGrid(title, symbol))
  }
};

const _removeStockFromGrid = (title, symbol) => ({
  type: types.REMOVE_STOCK,
  title: title,
  symbol: symbol
});

export const removeStockFromGrid = (title, symbol) => (dispatch, getState) => {
  const grid = getState().grids.find(g => g.title === title);
  if (grid || false && grid.symbols.indexOf(symbol) !== -1) {
    dispatch(_removeStockFromGrid(title, symbol))
  }
};
