import React from "react";
import Burger from "../../components/Burger/Burger";
import BurgerControls from "../../components/Burger/BuildControls/BuildControls";
import Model from '../../components/UI/Model/Model';
import OrderSummery from '../../components/Order/OrderSummery/OrderSummery';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import {connect} from "react-redux";
import * as actionCreators from '../../store/actions/actionCreators/burgerBuilderActionCreator';
import axios from '../../axios/axiosOrders';

//Global Variable for Prices
const INGREDIENTS_PRICES = {
	salad: 0.2,
	bacon: 0.9,
	cheese: 0.3,
	meat: 1.2
};

class BurgerBuilder extends React.Component {
	state = {
		purchasing: false,
		spinner: false,

	};


	/*
		componentDidMount() {
			axios.get('ingredients.json')
				.then((response) => this.props.getIngredients(response.data))
				.catch(err => this.setState({errMsg: true})
				);
		}
	*/

	componentDidMount() {
		this.props.initIngredients();
	}



	updatePurchaseState = (updatedIngredients) => {

		let sum = Object.keys(updatedIngredients).map((el) => {
			return updatedIngredients[el];
		}).reduce((acc, cur) => {
			return acc + cur
		}, 0);
		return sum > 0;

	};

	purchaseHandler = () => {
		if (this.props.isAuthenticated){
			this.setState({purchasing: true});
		}
		else {
			this.props.history.push('/auth')
		}

	};

	purchasingCancelHandler = () => {
		this.setState({purchasing: false})
	};

	purchasingContinueHandler = () => {
		this.props.history.push('/checkout');
	};

	render() {
		const disabledInfo = {...this.props.ingredients};
		let burger = this.props.err ? <div style={{textAlign: 'center'}}>something went WRONG!!</div> : <Spinner/>;
		let orderSummery = null;

		if (this.props.ingredients) {

			burger = (
				<React.Fragment>
					<Burger  ingredients={this.props.ingredients}/>
					<BurgerControls
						totalPrices={this.props.totalPrice}
						ingredientAdded={this.props.onIngredientAdd}
						ingredientRemoved={this.props.onIngredientRemove}
						disabledInfo={disabledInfo}
						prices={INGREDIENTS_PRICES}
						purchasable={this.updatePurchaseState(this.props.ingredients)}
						purchasing={this.purchaseHandler}
						isAuthenticated={this.props.isAuthenticated}
					/>
				</React.Fragment>
			);
			orderSummery = (<OrderSummery
				totalPrice={this.props.totalPrice}
				ingredients={this.props.ingredients}
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

const mapStateToProps = state => {

	return {
		ingredients: state.burgerBuilderReducer.ingredients,
		totalPrice: state.burgerBuilderReducer.totalPrice,
		err: state.burgerBuilderReducer.err,
		isAuthenticated:state.authReducer.token

	}
};
const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdd: (ingredientName) => dispatch(actionCreators.onIngredientAdd(ingredientName)),
		onIngredientRemove: (ingredientName) => dispatch(actionCreators.onIngredientRemove(ingredientName)),
		initIngredients: () => {
			dispatch(actionCreators.initIngredients())
		}

	}
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
