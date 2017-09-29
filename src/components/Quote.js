import React from 'react'
import PropTypes from 'prop-types'

import {CardActions, CardHeader, CardText} from 'material-ui/Card';


const Quote = ({ name, price, updated }) => {

  const priceDelta = "0.5 (1.1%)";
  const lastUpdated = "September 24, 2017 @ 05:30 CDT";  // props.updated

  return (
    <div className={"quote"}>
      <CardHeader 
        className={"name"}
        title={name}
        subtitle={updated} />
      <CardText className={"price-info"}>
        <h3 className={"price"}>
          {price.toFixed(2)} 
          <sup></sup>
        </h3>
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
