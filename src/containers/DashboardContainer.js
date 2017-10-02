import { connect } from 'react-redux';
import { addGrid, removeGrid } from '../actions';

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
      dispatch(removeGrid(title));
    }
  }
}

const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

export default DashboardContainer;
