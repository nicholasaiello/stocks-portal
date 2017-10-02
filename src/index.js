import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './components/App';
import configureStore from './store.js';
import { loadGrids } from './actions'

import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';

import './index.css';

/* TODO
 - user remove grid
 - allow user to add/remove cards (symbols)
 - implement back-off logic for polling stocks
 - add more meta data to stock cards (collapsible)
 - move magic numbers to constants
*/

const store = configureStore();
store.dispatch(loadGrids());

ReactDOM.render(
    (
    	<MuiThemeProvider>
     		<Provider store={store}>
        		<App />
        	</Provider>
    	</MuiThemeProvider>),
    document.getElementById('app-root')
);

registerServiceWorker();
injectTapEventPlugin();
