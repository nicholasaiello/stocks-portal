import React, { Component } from 'react';

import Subheader from 'material-ui/Subheader';

import IconMenu from 'material-ui/IconMenu';
import Menu from 'material-ui/Menu';
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
      sortOpen: false,
      anchorEl: null,
      symbols: props.symbols || [],
      quotes: {}
    };
  }

  componentDidMount() {
    this.updateQuotes(this.updateQuoteSort);
    // this.updateIntervalId = setInterval(() => {
    //   this.updateQuotes(this.updateQuoteSort);
    // }, 30 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.updateIntervalId);
  }

  updateQuotes = (callback) => {

    let i = 0;
    this.state.symbols.map((s) => {
      setTimeout(() => {
        
        this.dataService.fetchJson(s).then((quote) => {
          if (quote || false) {
            let quotes = Object.assign({}, this.state.quotes);
            
            quotes[quote.symbol] = quote;
            this.setState({ quotes: quotes });
            
            if (callback || false) {
              callback();
            }
          }
        });

      }, FETCH_INTERVAL * i);  // throttle the api service

      i += 1;
    }); 
  };

  updateQuoteSort = () => {
    let symbols = this.state.symbols.slice(),
      sortOrder = this.state.sortOrder;

    symbols.sort((a,b) => {
      let quotes = this.state.quotes;
      let a1 = (quotes[a] || {}).price || 0,
        b1 = (quotes[b] || {}).price || 0;

      return !sortOrder ? a1 - b1 : b1 - a1;
    });

    return symbols;
  };

  handleQuotesSort = (sortOrder) => {
    if (this.state.sortOrder !== sortOrder) {
      let symbols = this.updateQuoteSort();
      this.setState({ symbols: symbols, sortOrder: sortOrder, sortOpen: false });
    }
  };

  handleRemoveGrid = () => {
    if (window.confirm("Are you sure you'd like to remove this grid?")) {
      this.props.onRemoveClick(this.props.title);
    }
  };

  handleAddCardClick = () => {
    // TODO
  };

  render() {
    let cards = this.state.symbols.map((s, i) => {
        let q = this.state.quotes[s];
        if (q) {
          return <QuoteCard key={i} quote={this.state.quotes[s]} />
        } else {
          return <EmptyQuoteCard key={i} symbol={s} />
        }
      }
    );

    let size = cards.length,
      canAddMore = size < MAX_CARDS;

    if (canAddMore) {
      cards.push(
        <AddQuoteCard key={size} onClick={this.handleAddCardClick} />
      );
    }

    const menu = () => (
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
        cols={this.props.columns}
        style={this.props.styles}>
        <Subheader>
          {this.props.title}
          <div style={{float: 'right'}}>
            {menu()}
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
