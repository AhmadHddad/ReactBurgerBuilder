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

export const resetIngredients = () => {
	return {
		type: actionTypes.RESET_INGREDIENTS
	}
};

export const purchaseBurger = (orderData) => {

	return dispatch => {
		dispatch(resetIngredients());
		dispatch(purchaseBurgerStart());
		axios.post("orders.json ", orderData)
			.then(response => {
				console.log('response from purchaseBurgerStart', response.data);
				dispatch(purchaseBurgerSuccess(response.data.name, orderData))
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

export const fetchOrders = () => {

	return dispatch => {
		dispatch(fetchOrdersStart());
		axios.get('orders.json')
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




