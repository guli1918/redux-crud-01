import { useEffect } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Delete, Edit } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';

import './homePage.css';

import { useDispatch, useSelector } from 'react-redux';
import { deleteShipment, getSingleShipment, loadShipments } from '../../redux/actions';
import Leftbar from '../../components/Leftbar/Leftbar';
import { array_move } from '../../utils/pushArrElement';

const HomePage = () => {
	const dispatch = useDispatch();
	const { data } = useSelector((state) => state);

	useEffect(() => {
		dispatch(loadShipments());
	}, [dispatch]);

	const handleDelete = (id) => {
		if (window.confirm('Are you sure you want to delete this?')) {
			dispatch(deleteShipment(id));
			dispatch(loadShipments());
		}
	};

	return (
		<div className='HomePage'>
			<Leftbar />
			{!data.loading ? (
				<div className='HomePage-Wrapper'>
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} aria-label='simple table'>
							<TableHead>
								<TableRow className='HomePage-TableRow'>
									<TableCell>ID</TableCell>
									<TableCell align='right'>Order Number</TableCell>
									<TableCell align='right'>Date</TableCell>
									<TableCell align='right'>Customer</TableCell>
									<TableCell align='right'>Tracking Number</TableCell>
									<TableCell align='right'>Status</TableCell>
									<TableCell align='right'>Consignee</TableCell>
									<TableCell align='right'>Actions</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{data &&
									data.shipments.map((item, key) => (
										<TableRow
											key={key}
											sx={{
												'&:last-child td, &:last-child th': { border: 0 },
											}}
										>
											<TableCell component='th' scope='row'>
												{key + 1}
											</TableCell>
											<TableCell align='right'>{item.orderNo}</TableCell>
											<TableCell align='right'>
												{item.date &&
												array_move(
													item.date.split('-').reverse(),
													0,
													1
												).join('/')[0] === '/'
													? array_move(
															item.date.split('-').reverse(),
															0,
															1
													  )
													: array_move(
															item.date.split('-').reverse(),
															0,
															1
													  ).join('/')}
											</TableCell>
											<TableCell align='right'>{item.customer}</TableCell>
											<TableCell align='right'>{item.trackingNo}</TableCell>
											<TableCell
												style={{
													color:
														item.status === "'Delivered'"
															? 'green'
															: item.status === "'Shipped'"
															? 'purple'
															: 'orange',
												}}
												align='right'
											>
												{item.status && item.status.split("'")}
											</TableCell>
											<TableCell align='right'>{item.consignee}</TableCell>
											<TableCell className='HomePage-Buttons' align='right'>
												<Edit
													onClick={() =>
														dispatch(getSingleShipment(item.id))
													}
													className='HomePage-EditButton'
												/>
												<Delete
													onClick={() => handleDelete(item.id)}
													className='HomePage-DeleteButton'
												/>
											</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			) : (
				<CircularProgress className='CircularProgress' color='inherit' />
			)}
		</div>
	);
};

export default HomePage;
