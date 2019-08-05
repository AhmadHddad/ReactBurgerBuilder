import * as actionTypes from '../actions/actoinTypes/actionTypes';


const initialState = {
	orders: [],
	loading: false,
	purchased: false,
};

const reducer = (state = initialState, action) => {

	switch (action.type) {
		case actionTypes.PURCHASE_BURGER_SUCCESS:
			const newOrderData = {
				id: action.id,
				...action.orderData,

			};
			return {
				...state,
				loading: false,
				orders: state.orders.concat(newOrderData),
				purchased: true,
			};

		case actionTypes.PURCHASE_BURGER_FAIL:

			return {
				...state,
				loading: false,

			};
		case actionTypes.PURCHASE_BURGER_START:
			return {
				...state,
				loading: true
			};

		case actionTypes.FETCH_ORDERS_START:
			return {
				...state,
				loading: true,
			};
		case actionTypes.FETCH_ORDERS_SUCCESS:
			return {
				...state,
				loading: false,
				orders: action.orders
			};
		case actionTypes.FETCH_ORDERS_FAIL:
			return {
				...state,
				loading: false,
			};

		default:
			return {
				...state
			};
	}

};

export default reducer;