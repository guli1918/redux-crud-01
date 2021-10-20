import * as types from './actionType';
import axios from 'axios';

const getShipments = (users) => ({
	type: types.GET_SHIPMENTS,
	payload: users,
});

const shipmentDeleted = () => ({
	type: types.DELETE_SHIPMENT,
});

const shipmentAdded = () => ({
	type: types.ADD_SHIPMENT,
});

const shipmentUpdated = () => ({
	type: types.UPDATE_SHIPMENT,
});

const getShipment = (shipment) => ({
	type: types.GET_SINGLE_SHIPMENT,
	payload: shipment,
});

export const loadShipments = () => {
	return function (dispatch) {
		axios
			.get(`${process.env.REACT_APP_MOCKOON_API}`)
			.then((res) => {
				console.log(res);
				dispatch(getShipments(res.data));
			})
			.catch((err) => {
				console.log(err);
			});
	};
};
export const deleteShipment = (id) => {
	return function (dispatch) {
		axios
			.delete(`${process.env.REACT_APP_MOCKOON_API}/${id}`)
			.then(() => {
				dispatch(shipmentDeleted());
				dispatch(loadShipments());
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const addShipment = (user) => {
	return function (dispatch) {
		axios
			.post(`${process.env.REACT_APP_MOCKOON_API}`, user)
			.then(() => {
				dispatch(shipmentAdded());
				dispatch(loadShipments());
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const getSingleShipment = (id) => {
	return function (dispatch) {
		axios
			.get(`${process.env.REACT_APP_MOCKOON_API}/${id}`)
			.then((res) => {
				dispatch(getShipment(res.data));
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const updateShipment = (user, id) => {
	return function (dispatch) {
		axios
			.put(`${process.env.REACT_APP_MOCKOON_API}/${id}`, user)
			.then(() => {
				dispatch(shipmentUpdated());
				dispatch(loadShipments());
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const openOverlay = () => {
	return function (dispatch) {
		dispatch({
			type: types.OPEN_OVERLAY,
		});
	};
};

export const closeOverlay = () => {
	return function (dispatch) {
		dispatch({
			type: types.CLOSE_OVERLAY,
		});
	};
};
