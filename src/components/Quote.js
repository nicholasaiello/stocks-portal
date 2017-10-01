import React from 'react'
import PropTypes from 'prop-types'

import {CardActions, CardTitle, CardText} from 'material-ui/Card';


const Quote = ({ name, price, updated }) => {

  // FIXME junk
  const priceDelta = "0.5 (1.1%)";
  const lastUpdated = "September 24, 2017 @ 05:30 CDT";  // props.updated

  return (
    <div className={"quote"}>
      <CardTitle 
        className={"quote-name"}
        title={name}
        showExpandableButton={true}
        style={{padding: '4px 16px 2px 16px', borderBottom: '1px solid #f5f5f5', background: '#fbfbfb'}} />
      <CardText
        className={"quote-info"}
        style={{padding: '4px 16px 8px 16px'}}>
        <h2 className={"quote-price"}>
          {price.toFixed(2)} 
          <sup></sup>
        </h2>
        <small className={"quote-updated"}>{updated}</small>
      </CardText>
    </div>
  );
};

// Quote.propTypes = {
//   name: PropTypes.string,
//   price: PropTypes.number,
//   update: PropTypes.date
// };

export default Quote;
