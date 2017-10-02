import React from 'react'

import {CardHeader, CardText} from 'material-ui/Card';
import Chip from 'material-ui/Chip';


const Quote = ({ name, price, openPrice, updated, onRemoveClick }) => {

  const formatPrice = (price) => (
    `$${price.toFixed(2)}`
  );

  const formatPriceChange = (priceDelta, openPrice) => (
    `${priceDelta.toFixed(2)} (${( 100 / (openPrice / priceDelta) ).toFixed(2)}%)`
  );

  const now = new Date();

  let priceDelta, quoteClassName;

  // price is at least a day old
  if (now.toDateString() !== updated.toDateString()) {
    priceDelta = null;
    quoteClassName = '';
  } else {
    priceDelta = openPrice - price;
    quoteClassName = priceDelta > 0 ? ' up' : (priceDelta === 0 ? '' : ' down');
  }

  return (
    <div className={"quote" + quoteClassName}>
      <CardHeader 
        className={"quote-name"}
        title={name}
        titleColor={"#555"}
        style={{padding: '6px 16px 4px 16px', borderBottom: '1px solid #f5f5f5', background: '#fbfbfb'}}>
        <button style={closeIconStyles} onClick={() => onRemoveClick(name) }>X</button>
      </CardHeader>
      <CardText
        className={"quote-info"}
        style={{padding: '4px 16px 8px 16px'}}>
        <h2 className={"quote-price"}>
          {formatPrice(price)} 
          {priceDelta !== null ? <sup>{formatPriceChange(priceDelta, openPrice)}</sup> : ''}
        </h2>
        <small className={"quote-updated"}>last tick: {updated.toLocaleString()}</small>
      </CardText>
    </div>
  );
};

const closeIconStyles = {
  fontWeight: '800',
  borderRadius: '24px',
  background: '#fff',
  border: '1px solid #ddd',
  position: 'absolute',
  top: '4px',
  right: '8px',
  outline: 'none'
};

export default Quote;
