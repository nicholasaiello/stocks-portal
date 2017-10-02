import { 
  LOAD_GRIDS, 
  UPDATE_GRIDS, 
  ADD_GRID, 
  REMOVE_GRID, 
  ADD_STOCK,
  REMOVE_STOCK } 
from '../constants/ActionTypes';

const initialState = [];

const grids = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_GRIDS:
    case UPDATE_GRIDS:
      return action.grids;
    case ADD_GRID:
      return [...state, {title: action.title, symbols: []}];
    case REMOVE_GRID:
      return state.filter((grid) => (
        grid.title !== action.title
      ));
    case ADD_STOCK:
      let newState = [...state];
      newState.forEach((x, i) => {
        if (x.title === action.title) {
          newState[i].symbols = action.symbols.concat(newState[i].symbols);
        }
      });
      return newState;
    case REMOVE_STOCK:
      let newState2 = [...state];
      newState2.map((x, i) => {
        if (x.title === action.title) {
          newState2[i].symbols = newState2[i].symbols.filter((x) => x !== action.symbol);
        }
      });
      return newState2;
    default:
      return state;
  }

};

export default grids;
