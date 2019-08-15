import * as actionTypes from '../actoinTypes/actionTypes.js';
import axios from '../../../axios/axiosOrders';

// Action Creators
export const onIngredientAdd = (ingredientName) => {
	return {
		type: actionTypes.ADD_INGREDIENT, ingredientName: ingredientName
	}
};
export const onIngredientRemove = (ingredientName) => {
	return {
		type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingredientName
	}
};

export const getIngredients = (ingredients) => {
	return {
		type: actionTypes.GET_INGREDIENTS, ingredients: ingredients
	}
};

export const fetchIngredientsFailed = () => {
	return {
		type: actionTypes.FETCH_INGREDIENTS_FAILED
	}
};

export const initIngredients = () => {
	return dispatch => {
		axios.get('ingredients.json')
			.then((response) => dispatch(getIngredients(response.data)))
			.catch(err => dispatch(fetchIngredientsFailed())
			);
	}

};

export const initPrices = () => {
	return dispatch => {
		axios.get('Prices.json')
			.then((response) => dispatch(getPrices(response.data)))
			.catch(err => dispatch(fetchPricesFailed())
			);
	}

};


export const getPrices = (prices) => {
	return {
		type: actionTypes.GET_PRICES, prices: prices
	}
};




export const fetchPricesFailed = () => {
	return {
		type: actionTypes.FETCH_INGREDIENTS_FAILED
	}
};

