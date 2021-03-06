import React from 'react'
import PropTypes from 'prop-types'

import * as strings from '../constants/Strings';

import { Card, CardTitle, CardText } from 'material-ui/Card';
import ContentAdd from 'material-ui/svg-icons/content/add';

import Quote from './Quote';


export const QuoteCard = ({ quote, onRemoveClick }) => {

    return (
      <Card>
        <Quote 
          name={quote.symbol}
          price={quote.price}
          openPrice={quote.price}
          updated={quote.ts}
          onRemoveClick={onRemoveClick} />
      </Card>
    );

};

export const EmptyQuoteCard = ({ symbol }) => {

    let title = `fetching data for ${symbol}`;

    return (
      <Card>
        <CardTitle subtitle={title} />
      </Card>
    );

};

export const AddQuoteCard = ({ onClick }) => {

    return (
      <Card onClick={onClick}>
        <CardTitle
          subtitle={strings.addQuoteCardTitle}
          style={{padding: '8px 16px', textAlign: 'center', textTransform: 'uppercase'}} />
        <CardText
          style={{textAlign: 'center'}}>
          <ContentAdd style={{padding: '6px', background: 'gold', borderRadius: '64px'}} />
        </CardText>
      </Card>
    );

};
