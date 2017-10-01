import { connect } from 'react-redux';
import { addGrid, removeGrid } from '../actions';

import { getTotal, getCartProducts } from '../reducers'


import Dashboard from '../components/Dashboard';


const mapStateToProps = (state) => ({
  grids: state.grids
});

const mapDispatchToProps = dispatch => {
  return {
    onAddClick: title => {
      dispatch(addGrid(title))
    }
  }
}

const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

export default DashboardContainer;
