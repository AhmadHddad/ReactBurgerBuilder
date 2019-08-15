import * as actionTypes from '../actions/actoinTypes/actionTypes';


const initialState = {
	orders: [],
	loading: false,
	purchased: false,
	orderToUpdate: null,
	ingredientsToUpdate: null,
	updatedTotalPrice: null,
	prices: null,
	updating: false
};

const orderReducer = (state = initialState, action) => {
	let newIngredients = {...state.ingredientsToUpdate};
	let updatedTotalPrice;

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
				orders: action.orders,
			};

		case actionTypes.FETCH_ORDERS_FAIL:
			return {
				...state,
				loading: false,
			};

		case actionTypes.SET_ORDER_TO_UPDATE:
			let orderToUpdate;
			for (let i in state.orders) {
				if (state.orders[i].id === action.orderId) {
					orderToUpdate = state.orders[i];
				}
			}
			return {
				...state,
				orderToUpdate: orderToUpdate,
				loading: false,
				ingredientsToUpdate: orderToUpdate.ingredients,
				updatedTotalPrice: orderToUpdate.totalPrice,
				prices: action.prices,
				updating: true
			};

		case actionTypes.UPDATE_ORDER_START:
			return {
				...state,
				loading: true,

			};

		case actionTypes.UPDATE_INGREDIENT_ADD:
			newIngredients[action.ingredientName] = state.ingredientsToUpdate[action.ingredientName] + 1;
			updatedTotalPrice = (Number(state.updatedTotalPrice) + Number(state.prices[action.ingredientName])).toFixed(2);

			return {
				...state,
				ingredientsToUpdate: newIngredients,
				updatedTotalPrice: updatedTotalPrice,
			};

		case actionTypes.UPDATE_INGREDIENT_REMOVE:
			newIngredients[action.ingredientName] = state.ingredientsToUpdate[action.ingredientName] - 1;
			updatedTotalPrice = (Number(state.updatedTotalPrice) - Number(state.prices[action.ingredientName])).toFixed(2);

			return {
				...state,
				ingredientsToUpdate: newIngredients,
				updatedTotalPrice: updatedTotalPrice,
			};

		case actionTypes.UPDATE_ORDER_SUCCESS:
			let updatedOrder = {...action.updatedOrder, id: action.orderId};
			let newUpdatedOrders = state.orders.filter(v => v.id !== action.orderId);
			newUpdatedOrders.push(updatedOrder);
			return {
				...state,
				orders: newUpdatedOrders,
				loading: false,
				updating: false,

			};

		case actionTypes.DELETE_ORDER_START:
			return {
				...state,
				loading: true
			};

		case actionTypes.DELETE_ORDER_SUCCESS:
			let newOrders = state.orders.filter((v) => {
				return v.id !== action.orderId
			});
			return {
				...state,
				orders: newOrders,
				loading: false
			};

		case actionTypes.DELETE_ORDER_FAIL:
			return {
				...state,
				loading: false,

			};

		case actionTypes.UPDATE_CANCEL:
			return {
			...state,
			updating: false
			};

		default:
			return {
				...state,

			};
	}

};

export default orderReducer;