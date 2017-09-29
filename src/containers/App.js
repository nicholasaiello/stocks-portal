import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import QuoteCardGrid from './QuoteCardGrid';
import QuoteCardGridSet from '../components/QuoteCardGridSet';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      columns: (window.innerWidth > 480 ? 3 : 2),
      open: false
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

  handleDrawerToggle = () => {
    this.setState({open: !this.state.open});
  }

  handleDrawerClose = () => {
    this.setState({open: false});
  }

  render() {
    return (
      <div className="App">
        <AppBar
          title={this.props.title}
          onLeftIconButtonTouchTap={this.handleDrawerToggle} />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open: open})}>
            <MenuItem onClick={this.handleDrawerClose}>Profile</MenuItem>
            <MenuItem onClick={this.handleDrawerClose}>Contact</MenuItem>
        </Drawer>
        <header id={"header"}></header>
        <QuoteCardGridSet columns={this.state.columns} />
      </div>
    );
  }

}

export default App;
