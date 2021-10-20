import * as types from './actionType';

const initialState = {
	shipments: [],
	shipment: {},
	loading: true,
	editOverlay: false,
};

const shipmentsReducers = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_SHIPMENTS:
			return {
				...state,
				shipments: action.payload,
				loading: false,
				editOverlay: false,
			};
		case types.DELETE_SHIPMENT:
		case types.ADD_SHIPMENT:
		case types.UPDATE_SHIPMENT:
			return {
				...state,
				editOverlay: false,
			};
		case types.GET_SINGLE_SHIPMENT:
			return {
				...state,
				shipment: action.payload,
				loading: false,
				editOverlay: true,
			};
		case types.OPEN_OVERLAY:
			return {
				...state,
				editOverlay: true,
			};
		case types.CLOSE_OVERLAY:
			return {
				...state,
				editOverlay: false,
			};
		default:
			return state;
	}
};

export default shipmentsReducers;
