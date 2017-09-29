import React from 'react';

import QuoteCardGrid from '../containers/QuoteCardGrid';


const QuoteCardGridSet = (props) => {

  // TODO fetch from localStorage
  const gridData = [
    {
      title: 'Open Positions',
      symbols: ['MSFT', 'GPRO', 'SNAP', 'DRYS'],
      columns: props.columns,
      padding: props.padding
    },
    {
      title: 'Watchlist',
      symbols: ['FB', 'XOM', 'BABA'],
      columns: props.columns,
      padding: props.padding
    }
  ];

  const styles = {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around'
    },
    gridList: {
      overflowY: 'auto'
    }
  };

  const nodes = gridData.map((g, i) => (
      <QuoteCardGrid 
        key={i}
        title={g.title} 
        columns={g.columns}
        padding={g.padding}
        styles={styles}
        symbols={g.symbols} 
       />
    )
  );

  return (
    <span>{nodes}</span>
  );
};

export default QuoteCardGridSet;
