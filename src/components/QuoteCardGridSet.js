import React from 'react';

import QuoteCardGridContainer from '../containers/QuoteCardGridContainer';


const QuoteCardGridSet = ({ grids, columns, onRemoveGridClick = () => {} }) => {

  console.debug(grids);
  if (grids.length === 0) {
    return (
      <div>
        <h3>{"You don't have any charts to display."}</h3>
        <p>{"Click the button on the bottom-right corner to get started!"}</p>
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
