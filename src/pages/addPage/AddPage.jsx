import './addPage.css';
import Leftbar from '../../components/Leftbar/Leftbar';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addShipment } from '../../redux/actions';

const AddPage = () => {
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

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setState({ ...state, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!orderNo || !date || !customer || !trackingNo || !status || !consignee) {
			setError('Please fill all the fields!');
		} else {
			dispatch(addShipment(state));
			history.push('/');
			setError('');
		}
	};
	return (
		<div className='AddPage'>
			<Leftbar />
			<div className='AddPage-Wrapper'>
				<h3 className='AddPage-Wrapper-Title'>Add Shipment Record</h3>
				{error && <h3>{error}</h3>}
				<form className='AddPage-Wrapper-Form' onSubmit={handleSubmit}>
					<label>Order Number</label>
					<input
						value={orderNo}
						name='orderNo'
						placeholder='xx-xxxxxx-xxxxxx'
						type='text'
						onChange={handleInputChange}
						required
					/>
					<label>Date</label>
					<input
						value={date}
						name='date'
						type='date'
						onChange={handleInputChange}
						required
						minLength='2'
					/>
					<label>Customer</label>
					<input
						value={customer}
						name='customer'
						placeholder='Example Corp.'
						type='text'
						onChange={handleInputChange}
						required
					/>
					<label>Tracking Number</label>
					<input
						value={trackingNo}
						name='trackingNo'
						placeholder='TP-XXXXXX-XXXXXXX'
						type='text'
						onChange={handleInputChange}
						required
					/>
					<label>Status</label>
					<select
						className='AddPage-Wrapper-Form-Select'
						id='status'
						name='status'
						onChange={handleInputChange}
						required
						defaultValue={''}
					>
						<option disabled value=''>
							Select Status
						</option>
						<option value='In Transit'>In Transit</option>
						<option value="'Shipped'">Shipped</option>
						<option value="'Delivered'">Delivered</option>
					</select>
					<label>Consignee</label>
					<input
						value={consignee}
						name='consignee'
						placeholder='Example Inc.'
						type='text'
						onChange={handleInputChange}
					/>
					<button className='AddPage-Wrapper-Form-Button' type='submit'>
						ADD SHIPMENT
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddPage;
