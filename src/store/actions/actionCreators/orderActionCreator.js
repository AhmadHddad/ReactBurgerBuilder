import * as actionTypes from '../actoinTypes/actionTypes.js';
import axios from '../../../axios/axiosOrders';


export const purchaseBurgerSuccess = (id, orderData) => {
	alert("DONE!");
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS, id: id, orderData: orderData
	}
};

export const purchaseBurgerFail = (err) => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAIL, err: err
	}
};

export const purchaseBurgerStart = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_START
	}
};

// here you can remove this but you must go to the burgerReducer and GET_INGREDIENTS actionType you must return {...state, ingredients} without the if statement
export const resetIngredients = () => {
	return {
		type: actionTypes.RESET_INGREDIENTS
	}
};

export const purchaseBurger = (orderData, token) => {
	return dispatch => {

		dispatch(purchaseBurgerStart());
		axios.post("orders.json?auth=" + token, orderData)
			.then(response => {
				dispatch(resetIngredients());
				dispatch(purchaseBurgerSuccess(response.data.name, token))
			})
			.catch(err => purchaseBurgerFail(err));
	}
};

export const fetchOrdersSuccess = (orders) => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS, orders: orders
	}
};

export const fetchOrdersFail = (err) => {
	return {
		type: actionTypes.FETCH_ORDERS_FAIL, err: err
	}
};

export const fetchOrdersStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START
	}
};

export const fetchOrders = (token, userId) => {

	return dispatch => {
		dispatch(fetchOrdersStart());
		const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
		axios.get('orders.json' + queryParams)
			.then(response => {
				let orders = [];
				for (let key in response.data) {
					orders.push({
						...response.data[key],
						id: key
					})
				}
				dispatch(fetchOrdersSuccess(orders))
			})
			.catch(err => dispatch(fetchOrdersFail(err)));
	}
};







