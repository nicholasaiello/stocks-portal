import React from 'react'
import PropTypes from 'prop-types'

import Card from 'material-ui/Card';
import ContentAdd from 'material-ui/svg-icons/content/add';

import Quote from './Quote';


export const QuoteCard = ({ quote }) => {

    return (
      <Card>
        <Quote 
          name={quote.symbol}
          price={quote.price}
          updated={quote.ts} />
      </Card>
    );

};

export const EmptyQuoteCard = ({ symbol }) => {

    return (
      <Card>
        <p>fetching data for {symbol}</p>
      </Card>
    );

};

export const AddQuoteCard = () => {

    return (
      <Card>
        <ContentAdd />
      </Card>
    );

};
