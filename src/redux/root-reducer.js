import { combineReducers } from 'redux';
import shipmentsReducers from './reducer';

const rootReducer = combineReducers({
	data: shipmentsReducers,
});

export default rootReducer;
