import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EditShipments from './components/editShipments/EditShipments';

import AddPage from './pages/addPage/AddPage';
import HomePage from './pages/home/HomePage';
import { useSelector } from 'react-redux';

function App() {
	const { data } = useSelector((state) => state);
	return (
		<div className='App'>
			<Router>
				<Switch>
					<Route exact path='/'>
						<HomePage />
						{data.editOverlay && <EditShipments />}
					</Route>
					<Route path='/add'>
						<AddPage />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
