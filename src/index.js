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
 - allow user to add/remove cards (symbols)
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
