import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//Router
import { BrowserRouter } from 'react-router-dom';

//REDUX
import { Provider } from 'react-redux';
import store from './redux/store';

import './index.css';

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
