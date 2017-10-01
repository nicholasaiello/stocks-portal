import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';

import QuoteCardGrid from './QuoteCardGrid';


class QuoteCardGridSet extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      open: false
    };
  }

  handleAddGridClick = (e) => {
    // TODO show dialog
  }

  handleOpen = () => {
    this.setState({open: true});
  }

  handleClose = () => {
    this.setState({open: false});
  }

  render() {
    const nodes = this.props.grids.map((g, i) => (
        <QuoteCardGrid 
          key={i}
          title={g.title} 
          columns={this.props.columns}
          padding={this.props.padding}
          styles={this.props.gridStyles}
          symbols={g.symbols} />
      )
    );

    return (
      <div>
        <span>{nodes}</span>
      </div>
    );
  }
};

QuoteCardGridSet.defaultProps = {
  gridStyles: {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around'
    },
    gridList: {
      overflowY: 'auto'
    }
  }
};

export default QuoteCardGridSet;
