import { 
  UPDATE_STOCK } 
from '../constants/ActionTypes';

const initialState = {};

const quotes = (state = initialState, action) => {
  console.debug(state, action)
  switch(action.type) {
    case UPDATE_STOCK:
      const quote = action.quote;
      return Object.assign({}, state, {
        [quote.symbol]: quote
      });
    default:
      return state;
  }

};

export default quotes;
