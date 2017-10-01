import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'

const middleware = [ thunk ];
export default function configureStore() {
	return createStore(reducer, applyMiddleware(...middleware));
};