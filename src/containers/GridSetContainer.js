import { connect } from 'react-redux';
import { addGrid, removeGrid } from '../actions';

import { getTotal, getCartProducts } from '../reducers'

import QuoteCardGridSet from '../components/QuoteCardGridSet';

const mapStateToProps = (state) => ({
  grids: state.grids,
  columns: 3
});

const mapDispatchToProps = dispatch => {
  return {
    onAddClick: title => {
      dispatch(addGrid(title))
    }
  }
}

const GridSetContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuoteCardGridSet);

export default GridSetContainer;
