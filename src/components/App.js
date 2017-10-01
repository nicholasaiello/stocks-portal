import React, { Component } from 'react';

import Strings from '../constants/Strings';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import Dashboard from '../components/Dashboard';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      drawerOpen: false
    };
  }

  componentDidMount = () => {

  }

  componentWillUnmount = () => {
    
  }

  /**
   * Drawer event listeners
   */

  handleDrawerToggle = () => {
    this.setState({drawerOpen: !this.state.drawerOpen});
  }

  handleDrawerItemClick = (index) => {
    this.setState({drawerOpen: false});
  }

  render() {
    return (
      <div>
        <AppBar
          title={Strings.appTitle}
          onLeftIconButtonTouchTap={this.handleDrawerToggle} />
        <Drawer
          docked={false}
          width={200}
          open={this.state.drawerOpen}
          onRequestChange={(open) => this.setState({drawerOpen: open})}>
            <MenuItem onClick={() => this.handleDrawerItemClick(0)}>Profile</MenuItem>
            <MenuItem onClick={() => this.handleDrawerItemClick(1)}>Contact</MenuItem>
        </Drawer>
        <Dashboard />
      </div>
    );
  }

}

App.defaultProps = {
  addGridBtnStyles: {bottom: '24px', right: '16px', position: 'fixed'}
};

export default App;
