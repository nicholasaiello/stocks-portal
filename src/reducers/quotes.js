import { 
  UPDATE_STOCK } 
from '../constants/ActionTypes';

const initialState = {};

const quotes = (state = initialState, action) => {
  console.debug(state, action)
  switch(action.type) {
    case UPDATE_STOCK:
      return Object.assign({}, state, {
        [action.quote.symbol]: action.quote
      });
    default:
      return state;
  }

};

export default quotes;
