import React from 'react'
import PropTypes from 'prop-types'

import * as strings from '../constants/Strings';

import { Card, CardTitle, CardText } from 'material-ui/Card';
import ContentAdd from 'material-ui/svg-icons/content/add';

import Quote from './Quote';


export const QuoteCard = ({ quote }) => {

    return (
      <Card>
        <Quote 
          name={quote.symbol}
          price={quote.price}
          openPrice={quote.price + 0.44}
          updated={quote.ts} />
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

export const AddQuoteCard = () => {

    return (
      <Card>
        <CardTitle
          subtitle={strings.addQuoteCardTitle}
          style={{padding: '8px 16px', textAlign: 'center', textTransform: 'uppercase'}} />
        <CardText
          style={{textAlign: 'center'}}>
          <ContentAdd style={{padding: '8px 16px', background: '#ddd', borderRadius: '64px', padding: '6px'}} />
        </CardText>
      </Card>
    );

};
