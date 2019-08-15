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

export const deleteOrder = (orderId, userId) => {
	const token  = localStorage.getItem('token');
	return dispatch => {
			dispatch(deleteOrderStart());
		const queryParams = 'orders/' + orderId + '.json?auth=' + token;
		axios.delete(queryParams)
			.then(res => {
				dispatch(deleteOrderSuccess(orderId));})
			.catch(err => console.log('errDelete', err))

	}
	// const queryParams = orderId+'?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
};



export const submittingUpdate = (orderToUpdate,updatedIngredients,updatedTotalPrice) => {

	const orderId= orderToUpdate.id;
	const token  = localStorage.getItem('token');

	const updatedOrder = {
		ingredients:{...updatedIngredients},
		orderData:{...orderToUpdate.orderData},
		totalPrice:updatedTotalPrice,
		userId:orderToUpdate.userId,
	};
		return dispatch => {
			dispatch(updateOrderStart());
			console.log('this is updateHandler');
			const queryParams = 'orders/' + orderId + '.json?auth=' + token;
			axios.put(queryParams, updatedOrder)
				.then(res => {
					return dispatch(updateOrderSuccess(updatedOrder,orderId));
				})
				.catch(err => console.log('this is err from update', err))
		}
};

export const updateOrderStart=() => {
  return{
  	type:actionTypes.UPDATE_ORDER_START
  }
};
export const updateOrderSuccess = (updatedOrder,orderId) => {
	return {
		type: actionTypes.UPDATE_ORDER_SUCCESS,orderId: orderId,updatedOrder:updatedOrder
	}
};
export const updateIngredientAdd = (ingredientName) => {
	return {
		type: actionTypes.UPDATE_INGREDIENT_ADD, ingredientName: ingredientName
	}
};
export const updateIngredientRemove = (ingredientName) => {
	return {
		type: actionTypes.UPDATE_INGREDIENT_REMOVE, ingredientName: ingredientName
	}
};


export const deleteOrderStart=() => {
    return{
    	type:actionTypes.DELETE_ORDER_START
    }
};

export const deleteOrderSuccess=(orderId) => {
    return{
    	type:actionTypes.DELETE_ORDER_SUCCESS,orderId:orderId
    }
};

export const setOrderToUpdate=(orderId,prices) => {
    return{
    	type:actionTypes.SET_ORDER_TO_UPDATE, orderId:orderId,prices:prices
    }
};

export const updateCancel=() => {
    return{
    	type:actionTypes.UPDATE_CANCEL
    }
};










