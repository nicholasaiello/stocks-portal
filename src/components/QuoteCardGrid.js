import React, { Component } from 'react';

import { updateStockPrice } from '../actions';

import Subheader from 'material-ui/Subheader';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Divider from 'material-ui/Divider';
import GridList from 'material-ui/GridList';

import { QuoteCard, EmptyQuoteCard, AddQuoteCard } from '../components/QuoteCard';

import AlphaVantageService from '../services/AlphaVantageService';


// TODO move
const FETCH_INTERVAL = 1500;
const MAX_CARDS = 6;


class QuoteCardGrid extends Component {

  constructor(props) {
    super(props);
    this.dataService = AlphaVantageService(this);
    this.state = { 
      columns: props.columns,
      sortOrder: -1,
      sortOpen: false
    };
  }

  componentDidMount() {
    this.updateQuotes();
    // this.updateIntervalId = setInterval(() => {
    //   this.updateQuotes(this.updateQuoteSort);
    // }, 30 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.updateIntervalId);
  }

  updateQuotes = (callback) => {

    let i = 0;
    this.props.symbols.map((s) => {
      setTimeout(() => {
        
        this.props.dispatch(updateStockPrice(s))

      }, FETCH_INTERVAL * i);  // throttle the api service

      i += 1;
    });

  };

  sortQuotes = () => {
    let symbols = this.props.symbols.slice(),
      sortOrder = this.state.sortOrder;

    const quotes = this.props.quotes;
    symbols.sort((a,b) => {
      let a1 = (quotes[a] || {}).price || 0,
        b1 = (quotes[b] || {}).price || 0;

      return sortOrder ? a1 - b1 : b1 - a1;
    });

    return symbols;
  };

  handleQuotesSort = (sortOrder) => {
    if (this.state.sortOrder !== sortOrder) {
      this.setState({ sortOrder: sortOrder, sortOpen: false });
    }
  };

  handleRemoveGrid = () => {
    if (window.confirm("Are you sure you'd like to remove this grid?")) {
      this.props.onRemoveGridClick(this.props.title);
    }
  };

  handleAddCardClick = () => {
    const validateInput = (text) => (
      (text || false) && text !== 'Enter ticker symbol:' && /^[a-zA-Z]{2,4}$/.test(text)
    );

    // TODO check for unique names
    let title = this.props.title,
      symbol = window.prompt(`Add a stock card to "${title}"`, 'Enter ticker symbol:');

    if (validateInput(symbol)) {
      this.props.onAddStockClick(title, symbol.toUpperCase());
    } else if (symbol !== null) {
      alert('Bad input. Please try again.');
    }
  };

  render() {
    console.debug(this.props);
    const quotes = this.props.quotes;
    let cards = this.sortQuotes().map((s, i) => {
        let q = quotes[s];
        if (q) {
          return <QuoteCard key={i} quote={quotes[s]} />
        } else {
          return <EmptyQuoteCard key={i} symbol={s} />
        }
      }
    );

    let size = cards.length,
      canAddMore = size < MAX_CARDS;

    if (canAddMore) {
      cards.push(
        <AddQuoteCard key={size} onClick={() => { this.handleAddCardClick(); }} />
      );
    }

    const iconMenu = () => (
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}>
        <MenuItem primaryText="Price: High" onClick={() => { this.handleQuotesSort(0); }} />
        <MenuItem primaryText="Price: Low" onClick={() => { this.handleQuotesSort(1); }} />
        <Divider />
        <MenuItem primaryText="Remove" onClick={() => { this.handleRemoveGrid(); }} />
      </IconMenu>
    );

    return (
      <GridList
        cellHeight={'auto'}
        cols={this.props.columns}
        style={this.props.styles}>
        <Subheader>
          {this.props.title}
          <div style={{float: 'right', clear: 'both'}}>
            {iconMenu()}
          </div>
        </Subheader>
        {cards}
      </GridList>
    ); 
  } 
};

QuoteCardGrid.defaultProps = {
  styles: {
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

export default QuoteCardGrid;
