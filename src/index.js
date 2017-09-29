import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './containers/App';

import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';

/* TODO
 - allow user to create grids
 - allow user to add/remove cards (symbols)
 - add TTL rules to local data
 - more styling
*/

ReactDOM.render(
    (<MuiThemeProvider>
        <App title={"~ stocks portal ~"} />
    </MuiThemeProvider>),
    document.getElementById('app-root')
);

registerServiceWorker();
injectTapEventPlugin();
