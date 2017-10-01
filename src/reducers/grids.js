import { ADD_GRID, REMOVE_GRID } from '../constants/ActionTypes';

const initialState = [];

const grids = (state = initialState, action) => {

  switch(action.type) {
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
