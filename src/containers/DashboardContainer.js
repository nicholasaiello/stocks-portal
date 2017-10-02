import { connect } from 'react-redux';
import { addGrid, removeGrid, updateGrids } from '../actions';

import { getTotal, getCartProducts } from '../reducers'


import Dashboard from '../components/Dashboard';


const mapStateToProps = (state) => ({
  grids: state.grids
});

const mapDispatchToProps = dispatch => {
  return {
    onAddGridClick: title => {
      dispatch(addGrid(title));
    },
    onRemoveGridClick: title => {
      console.debug('REMOVE: ' + title);
      dispatch(removeGrid(title));
    }
  }
}

const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

export default DashboardContainer;
