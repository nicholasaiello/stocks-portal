import grids from '../api/grids'
import * as types from '../constants/ActionTypes'


/**
 * Generic grid actions
 */

const _loadGrids = (grids) => ({
  type: types.LOAD_GRIDS,
  grids: grids
});

export const loadGrids = () => dispatch => {
  grids.fetchGrids(grids => {
    dispatch(loadGrids(grids))
  })
};

const _addGrid = (title) => ({
  type: types.ADD_GRID,
  title: title
});

export const addGrid = title => (dispatch, getState) => {
  if (!getState().grids.find(g => g.title === title)) {
    dispatch(_addGrid(title))
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
