import React, { Component } from 'react';

import * as strings from '../constants/Strings';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Snackbar from 'material-ui/Snackbar';

import QuoteCardGridSet from './QuoteCardGridSet';

const MAX_GRIDS = 4;

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      columns: (window.innerWidth > 480 ? 3 : 2),
      snackbarOpen: false,
      snackbarCopy: ''
    };
  }

  componentDidMount = () => {
    this.handleWindowResize();
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  handleWindowResize = () => {
    this.setState({ columns: (window.innerWidth > 480 ? 3 : 2) });
  }

  /**
   * Add Grid (FAB) even listeners
   */

  handleAddGridClick = () => {
    const validateInput = (text) => (
      (text || false) && text !== strings.addGridPromptHint && /^(\w)+(\s)?(\w)+$/.test(text)
    );

    // TODO check for unique names
    let title = window.prompt(strings.addGridPromptTitle, strings.addGridPromptHint);
    if (validateInput(title)) {
      this.props.onAddGridClick(title);
    } else if (title !== null) {
      alert('Bad input. Please try again.');
    }
  }

  /**
   * Snackbar event listeners
   */

  handleSnackbarToggle = (copy) => {
    this.setState({snackbarOpen: true, snackbarCopy: copy});
  }

  handleSnackbarClose = () => {
    this.setState({snackbarOpen: false});
  }

  render() {
    const canAddGrid = this.props.grids.length < MAX_GRIDS;
    return (
      <div className="dashboard">
        <FloatingActionButton 
          style={this.props.addGridBtnStyles}
          mini={true} 
          secondary={true} 
          disabled={!canAddGrid} 
          onClick={() => { this.handleAddGridClick(); }}>
          <ContentAdd />
        </FloatingActionButton>
        <QuoteCardGridSet
          grids={this.props.grids}
          columns={this.state.columns} />
        <Snackbar
          open={this.state.snackbarOpen}
          message={this.state.snackbarCopy}
          autoHideDuration={4000}
          onRequestClose={this.handleSnackbarClose}
        />
      </div>
    );
  }

}

Dashboard.defaultProps = {
  addGridBtnStyles: {bottom: '16px', right: '16px', position: 'fixed'}
};

export default Dashboard;
