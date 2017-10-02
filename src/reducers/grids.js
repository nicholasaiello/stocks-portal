import { LOAD_GRIDS, UPDATE_GRIDS, ADD_GRID, REMOVE_GRID } from '../constants/ActionTypes';

const initialState = [];

const grids = (state = initialState, action) => {
  console.debug(state, action);
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
    default:
      return state;
  }

};

export default grids;
