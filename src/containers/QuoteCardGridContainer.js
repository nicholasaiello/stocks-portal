import { connect } from 'react-redux';
import { removeGrid, addStockToGrid, removeStockFromGrid } from '../actions';

import QuoteCardGrid from '../components/QuoteCardGrid';

const mapStateToProps = (state) => {
  return {
    quotes: state.quotes
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    'dispatch': (act) => {
      dispatch(act);
    },
    onRemoveGridClick: title => {
      dispatch(removeGrid(title));
    },
    onAddStockClick: (title, symbol) => {
      dispatch(addStockToGrid(title, symbol));
    },
    onRemoveStockClick: (title, symbol) => {
      dispatch(removeStockFromGrid(title, symbol));
    }
  };
};

const QuoteCardGridContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuoteCardGrid);

export default QuoteCardGridContainer;
