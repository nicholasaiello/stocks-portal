import React from 'react'
import PropTypes from 'prop-types'

import Card from 'material-ui/Card';
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

export default QuoteCard;
