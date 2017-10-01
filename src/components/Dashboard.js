import React, { Component } from 'react';

import Strings from '../constants/Strings';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import QuoteCardGrid from './QuoteCardGrid';
import QuoteCardGridSet from './QuoteCardGridSet';


// TODO fetch from localStorage
const gridData = [
    {
      title: 'Open Positions',
      symbols: ['MSFT', 'GPRO', 'SNAP', 'DRYS']
    },
    {
      title: 'Watchlist',
      symbols: ['FB', 'XOM', 'BABA']
    }
  ];

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      grids: gridData,
      canAddGrid: true,  // gridData.length >= MAX_GRIDS,
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

  handleQuotesUpdate = (quotes) => {
    this.setState({ quotes: quotes });
  }

  handleWindowResize = () => {
    this.setState({ columns: (window.innerWidth > 480 ? 3 : 2) });
  }

  /**
   * Add Grid (FAB) even listeners
   */

  handleAddGridClick = () => {
    // TODO check for unique names
    let title = prompt(Strings.addGridPromptTitle, Strings.addGridPromptHint);
    if (title && title != Strings.addGridPromptHint && /^(\w)+(\s)?(\w)+$/.test(title)) {
      let grids = this.state.grids.slice();
      grids.push({title: title, symbols: []});
      this.setState({grids: grids});
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
        <QuoteCardGridSet grids={this.state.grids} columns={this.state.columns} />
      </div>
    );
  }

}

Dashboard.defaultProps = {
  addGridBtnStyles: {bottom: '16px', right: '16px', position: 'fixed'}
};

export default Dashboard;
