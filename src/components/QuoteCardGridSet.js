import React from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import QuoteCardGrid from '../containers/QuoteCardGrid';


// TODO move to consts
const MAX_GRIDS = 4;

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


const QuoteCardGridSet = (props) => {

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

  const handleAddGridClick = (e) => {
    // TODO show dialog
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
    <FloatingActionButton mini={true} secondary={true} disabled={gridData.length >= MAX_GRIDS} onClick={handleAddGridClick}>
      <ContentAdd />
    </FloatingActionButton>
  );
};

export default QuoteCardGridSet;
