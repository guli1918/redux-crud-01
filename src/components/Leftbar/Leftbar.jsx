import './leftbar.css';
import { Home, Add } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Leftbar = () => {
	return (
		<div className='Leftbar'>
			<ul>
				<Link className='Link' to='/'>
					<li>
						<Home />
						Homepage
					</li>
				</Link>
				<Link className='Link' to='add'>
					<li>
						<Add />
						Add Shipment
					</li>
				</Link>
			</ul>
		</div>
	);
};

export default Leftbar;
