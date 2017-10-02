import React from 'react';

import QuoteCardGridContainer from '../containers/QuoteCardGridContainer';


const QuoteCardGridSet = ({ grids, columns, onRemoveGridClick = () => {} }) => {

  console.debug(grids);
  if (grids.length === 0) {
    return (
      <div>
        <h3>{"You don't have any charts to display."}</h3>
        <p>{"Create a chart, and start adding some stock quotes:"}</p>
        <ol>
          <li>Click the "+" in the bottom-right corner, and name your chart.</li>
          <li>Begin adding stock symbols to your new chart.</li>
          <li>Sort stocks by price, remove cards , or just remove the entire chart.</li>
        </ol>
      </div>
    );
  }

  const nodes = grids.map((g, i) => (
        <QuoteCardGridContainer 
          key={i}
          title={g.title}
          symbols={g.symbols}
          columns={columns} />
      )
    );

  return (
    <div>
      {nodes}
    </div>
  );

};

export default QuoteCardGridSet;
