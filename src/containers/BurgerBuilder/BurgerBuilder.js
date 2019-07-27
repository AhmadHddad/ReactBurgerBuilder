import React from "react";
import Burger from "../../components/Burger/Burger";
import BurgerControls from "../../components/Burger/BuildControls/BuildControls";
import Model from '../../components/UI/Model/Model';
import OrderSummery from '../../components/Order/OrderSummery/OrderSummery';
import axios from '../../axios/axiosOrders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';

//Global Variable for Prices
const INGREDIENTS_PRICES = {
	salad: 0.2,
	bacon: 0.9,
	cheese: 0.3,
	meat: 1.2
};

class BurgerBuilder extends React.Component {
	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0
		},
		// ingredients: null,
		price: 4,
		purchasable: false,
		purchasing: false,
		spinner: false,
		errMsg: null,

	};


	constructor(props, context) {
		super(props, context);
		axios.get('ingredients.json')
			.then((response) => this.setState({ingredients: response.data, spinner: false}))
			.catch(err => this.setState({errMsg: true})
			);
	}

	updatePurchaseState = (updatedIngredients) => {

		let sum = Object.keys(updatedIngredients).map((el) => {
			return updatedIngredients[el];
		}).reduce((acc, cur) => {
			return acc + cur
		}, 0);
		if (sum > 0) {
			this.setState({purchasable: true});
		} else {
			this.setState({purchasable: false});
		}

	};

	purchaseHandler = () => {
		this.setState({purchasing: true});
	};

	purchasingCancelHandler = () => {
		this.setState({purchasing: false})
	};

	purchasingContinueHandler = () => {
		const queryParams = [];
		for (let i in this.state.ingredients) {
			queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
		}
		const queryString = queryParams.join('&');
		this.props.history.push({
			pathname: '/checkout',
			search: '?' + queryString,

		})
	};

	addIngredientHandler = type => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;

		const updatedIngredients = {
			...this.state.ingredients
		};

		updatedIngredients[type] = updatedCount;
		const oldPrice = this.state.price;
		const priceAddition = INGREDIENTS_PRICES[type];
		const newPrice = oldPrice + priceAddition;

		this.setState({
			price: newPrice,
			ingredients: updatedIngredients
		});
		this.updatePurchaseState(updatedIngredients);
	};

	removeIngredientHandler = type => {
		const oldCount = this.state.ingredients[type];
		if (oldCount <= 0) {
			return null;
		}
		const updatedCount = oldCount - 1;
		const getIngredients = {...this.state.ingredients};
		const getCurrentPrice = this.state.price;
		const getIngredientPrice = INGREDIENTS_PRICES[type];

		const updatePrice = getCurrentPrice - getIngredientPrice;

		getIngredients[type] = updatedCount;
		this.setState({
			ingredients: getIngredients,
			price: updatePrice,
		});
		this.updatePurchaseState(getIngredients);
	};

	render() {
		const disabledInfo = {...this.state.ingredients};
		let burger = this.state.errMsg ? <div style={{textAlign: 'center'}}>something went WRONG!!</div> : <Spinner/>;
		let orderSummery = null;

		if (this.state.ingredients !== null) {

			burger = (
				<React.Fragment>
					<Burger ingredients={this.state.ingredients}/>
					<BurgerControls
						totalPrices={this.state.price}
						ingredientAdded={this.addIngredientHandler}
						ingredientRemoved={this.removeIngredientHandler}
						disabledInfo={disabledInfo}
						prices={INGREDIENTS_PRICES}
						purchasable={this.state.purchasable}
						purchasing={this.purchaseHandler}
					/>
				</React.Fragment>
			);
			orderSummery = (<OrderSummery
				totalPrice={this.state.price}
				ingredients={this.state.ingredients}
				cancel={this.purchasingCancelHandler}
				continue={this.purchasingContinueHandler}
			/>);

		}
		if (this.state.spinner) {
			orderSummery = <Spinner/>;
		}

		return (
			<React.Fragment>
				<Model show={this.state.purchasing} hide={this.purchasingCancelHandler}>
					{orderSummery}
				</Model>
				{burger}
			</React.Fragment>
		);
	}
}

export default withErrorHandler(BurgerBuilder, axios);
