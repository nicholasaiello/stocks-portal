import React, { Component } from 'react';

import * as strings from '../constants/Strings';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import QuoteCardGrid from './QuoteCardGrid';
import QuoteCardGridSet from './QuoteCardGridSet';
import GridSetContainer from '../containers/GridSetContainer';

const MAX_GRIDS = 4;

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      canAddGrid: this.props.grids.length >= MAX_GRIDS,
      columns: (window.innerWidth > 480 ? 3 : 2),
      drawerOpen: false
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
    let title = prompt(strings.addGridPromptTitle, strings.addGridPromptHint);
    if (validateInput(title)) {
      this.props.onAddClick(title);
    } else {
      alert('Bad input. Please try again.');
    }
  }

  /**
   * Drawer event listeners
   */

  handleDrawerToggle = () => {
    this.setState({drawerOpen: !this.state.drawerOpen});
  }

  handleDrawerClose = () => {
    this.setState({drawerOpen: false});
  }

  render() {
    return (
      <div className="dashboard">
        <FloatingActionButton 
          style={this.props.addGridBtnStyles}
          mini={true} 
          secondary={true} 
          disabled={!this.state.canAddGrid} 
          onClick={() => {this.handleAddGridClick(); }}>
          <ContentAdd />
        </FloatingActionButton>
        <QuoteCardGridSet
          grids={this.props.grids}
          columns={this.state.columns} />
      </div>
    );
  }

}

Dashboard.defaultProps = {
  addGridBtnStyles: {bottom: '16px', right: '16px', position: 'fixed'}
};

export default Dashboard;
