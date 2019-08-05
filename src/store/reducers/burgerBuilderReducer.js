import * as actionTypes from '../actions/actoinTypes/actionTypes.js'


const initialState = {
/*	ingredients: {
		salad: 0,
		bacon: 0,
		cheese: 0,
		meat: 0,
	},*/ingredients:null,
	totalPrice: 4,
	err: false,
};

const INGREDIENTS_PRICES = {
	salad: 0.2,
	bacon: 0.9,
	cheese: 0.3,
	meat: 1.2
};

const burgerBuilderReducer = (state = initialState, action) => {

	const newIngredients = {...state.ingredients};
	let totalPrice = {...state.totalPrice};

	switch (action.type) {

		case actionTypes.ADD_INGREDIENT:

			newIngredients[action.ingredientName] = state.ingredients[action.ingredientName] + 1;
			 totalPrice = (Number(state.totalPrice) + Number(INGREDIENTS_PRICES[action.ingredientName])).toFixed(2);
			return {
				...state,
				 ingredients: newIngredients,
				totalPrice:totalPrice,
			};

		case actionTypes.REMOVE_INGREDIENT:
			if (newIngredients[action.ingredientName] >= 0) {
				newIngredients[action.ingredientName] = state.ingredients[action.ingredientName] - 1;
				totalPrice = (Number(state.totalPrice) - Number(INGREDIENTS_PRICES[action.ingredientName])).toFixed(2);
			}
			return {
				...state,
				ingredients: newIngredients,
				totalPrice: totalPrice,
			};
		case actionTypes.GET_INGREDIENTS:
			if (!state.ingredients){
				return {
					...state,
					ingredients: {salad: action.ingredients.salad,
						bacon: action.ingredients.bacon,
						cheese: action.ingredients.cheese,
						meat: action.ingredients.meat,},
					err: false,
					totalPrice:4
				};
			}
			else {
				return {
					...state
				}
			}

		case actionTypes.FETCH_INGREDIENTS_FAILED:
			return {
				...state,
				err: true,
			};
		case actionTypes.RESET_INGREDIENTS:
			return {
				...state,
				ingredients: {
					salad: 0,
					bacon: 0,
					cheese: 0,
					meat: 0,
				}};
		default:
			return state;

	}
};
export default burgerBuilderReducer;