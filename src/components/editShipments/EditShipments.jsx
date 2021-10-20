import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { closeOverlay, updateShipment } from '../../redux/actions';

import { array_move } from '../../utils/pushArrElement';

import CloseIcon from '@mui/icons-material/Close';
import './editShipments.css';

const EditShipments = () => {
	const [state, setState] = useState({
		orderNo: '',
		date: '',
		customer: '',
		trackingNo: '',
		status: '',
		consignee: '',
	});

	const [error, setError] = useState('');
	const history = useHistory();
	const dispatch = useDispatch();

	const { orderNo, date, customer, trackingNo, status, consignee } = state;
	const { shipment } = useSelector((state) => state.data);

	useEffect(() => {
		shipment && setState({ ...shipment });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setState({ ...state, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!orderNo && !date && !customer && !trackingNo && !status && !consignee) {
			setError('Please fill all the fields!');
		} else {
			dispatch(updateShipment(state, shipment.id));
			history.push('/');
			setError('');
		}
	};

	let newDate = date.split('/');
	for (var i = 0; newDate.length > i; i++) {
		if (newDate[i].length === 1) {
			newDate[i] = '0' + newDate[i];
		}
	}

	return (
		<div className='EditShipment'>
			<div onClick={() => dispatch(closeOverlay())} className='EditShipment-Overlay'></div>
			<div className='EditShipment-Wrapper'>
				{shipment && (
					<form onSubmit={handleSubmit} className='EditShipment-Wrapper-Form'>
						<CloseIcon
							onClick={() => dispatch(closeOverlay())}
							className='EditShipment-Wrapper-CloseIcon'
						/>
						<h3 className='EditShipment-Wrapper-Form-Title'>Edit Shipment Data</h3>
						{error && <h3>{error}</h3>}
						<label>Order Number</label>
						<input
							value={orderNo}
							name='orderNo'
							placeholder={shipment.orderNo}
							type='text'
							onChange={handleInputChange}
						/>
						<label>Date</label>
						<input
							value={array_move(newDate, 0, 1).reverse().join('-')}
							name='date'
							type='date'
							onChange={handleInputChange}
						/>
						<label>Customer</label>
						<input
							value={customer}
							name='customer'
							placeholder={shipment.customer}
							type='text'
							onChange={handleInputChange}
						/>
						<label>Tracking Number</label>
						<input
							value={trackingNo}
							name='trackingNo'
							placeholder={shipment.trackingNo}
							type='text'
							onChange={handleInputChange}
						/>
						<label>Status</label>
						<select
							className='AddPage-Wrapper-Form-Select'
							id='status'
							name='status'
							onChange={handleInputChange}
							defaultValue={status}
						>
							<option value="'In Transit'">In Transit</option>
							<option value="'Shipped'">Shipped</option>
							<option value="'Delivered'">Delivered</option>
						</select>
						<label>Consignee</label>
						<input
							value={consignee}
							name='consignee'
							placeholder={shipment.consignee}
							type='text'
							onChange={handleInputChange}
						/>
						<button className='EditShipment-Wrapper-Form-Button'>UPDATE</button>
					</form>
				)}
			</div>
		</div>
	);
};

export default EditShipments;
