import React from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Model from '../../components/UI/Model/Model';
import OrderSummery from '../../components/Order/OrderSummery/OrderSummery';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import {connect} from "react-redux";
import * as actionCreators from '../../store/actions/actionCreators/burgerBuilderActionCreator';
import axios from '../../axios/axiosOrders';
import SpecialButton from "../../components/UI/Buttons/SpecialButton/SpecialButton";


export class BurgerBuilder extends React.Component {
	state = {
		purchasing: false,
		spinner: false,
	};

	componentDidMount() {
		this.props.initIngredients();
		this.props.initPrices();

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
		if (this.props.isAuthenticated) {
			this.setState({purchasing: true});
		} else {
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

		if (this.props.ingredients && this.props.prices) {

			const orderButton = (<SpecialButton
				className={'Order'}
				disabled={!this.updatePurchaseState(this.props.ingredients)}
				clicked={this.purchaseHandler}>
				{this.props.isAuthenticated ? 'Order Now' : 'Sign-in to order'}
			</SpecialButton>);

			burger = (
				<React.Fragment>
					<Burger ingredients={this.props.ingredients}/>
					<BuildControls
						totalPrice={this.props.totalPrice}
						ingredientAdded={this.props.onIngredientAdd}
						ingredientRemoved={this.props.onIngredientRemove}
						disabledInfo={disabledInfo}
						prices={this.props.prices}
						purchasable={() => this.updatePurchaseState(this.props.ingredients)}
						purchasing={this.purchaseHandler}
						isAuthenticated={this.props.isAuthenticated}
						bottomButton={orderButton}
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
		isAuthenticated: state.authReducer.token,
		prices: state.burgerBuilderReducer.prices,
	}
};
const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdd: (ingredientName) => dispatch(actionCreators.onIngredientAdd(ingredientName)),
		onIngredientRemove: (ingredientName) => dispatch(actionCreators.onIngredientRemove(ingredientName)),
		initIngredients: () => {
			dispatch(actionCreators.initIngredients())
		},
		initPrices: () => {
			dispatch(actionCreators.initPrices())
		}

	}
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));