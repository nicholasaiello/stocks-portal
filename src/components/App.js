import React, { Component } from 'react';

import * as strings from '../constants/Strings';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import Dashboard from './Dashboard';
import DashboardContainer from '../containers/DashboardContainer';

import AboutPage from './AboutPage';
import ContactPage from './ContactPage';
import ProfilePage from './ProfilePage';

import '../App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      currentPage: 0,
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

  handleDrawerItemClick = (page) => {
    this.setState({currentPage: page, drawerOpen: false});
  }

  render() {

    const page = (p) => {
      switch(p) {
        case 0:
          return <DashboardContainer />;
        case 1:
          return <ProfilePage />;
        case 2:
          return <AboutPage />;
        case 3:
          return <ContactPage />;
      }
    };

    return (
      <div className="app">
        <AppBar
          title={strings.appTitle}
          onLeftIconButtonTouchTap={this.handleDrawerToggle} />
        <Drawer
          docked={false}
          width={200}
          open={this.state.drawerOpen}
          onRequestChange={(open) => this.setState({drawerOpen: open})}>
            <MenuItem onClick={() => this.handleDrawerItemClick(0)}>Overview</MenuItem>
            <br/>
            <MenuItem onClick={() => this.handleDrawerItemClick(1)}>Profile</MenuItem>
            <MenuItem onClick={() => this.handleDrawerItemClick(2)}>About</MenuItem>
            <MenuItem onClick={() => this.handleDrawerItemClick(3)}>Contact</MenuItem>
        </Drawer>
        <div className="page-wrapper">
          {page(this.state.currentPage)}
        </div>
      </div>
    );
  }

}

App.defaultProps = {
  addGridBtnStyles: {bottom: '24px', right: '16px', position: 'fixed'}
};

export default App;
