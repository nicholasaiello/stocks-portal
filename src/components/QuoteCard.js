import React from 'react'
import PropTypes from 'prop-types'

import Card from 'material-ui/Card';
import ContentAdd from 'material-ui/svg-icons/content/add';

import Quote from './Quote';


const QuoteCard = ({ quote }) => {

    return (
      <Card>
        <Quote 
          name={quote.symbol}
          price={quote.price}
          updated={quote.ts} />
      </Card>
    );

};

const EmptyQuoteCard = ({ symbol }) => {

    return (
      <Card>
        <p>fetching data for {symbol}</p>
      </Card>
    );

};

const AddQuoteCard = () => {

    return (
      <Card>
        <ContentAdd />
      </Card>
    );

};

export default QuoteCard;
export default AddQuoteCard;
