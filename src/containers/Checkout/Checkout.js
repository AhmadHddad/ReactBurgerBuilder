import React from 'react';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';


const INGREDIENTS_PRICES = {
	salad: 0.2,
	bacon: 0.9,
	cheese: 0.3,
	meat: 1.2
};

class Checkout extends React.Component {
	state = {
		ingredients: {
			meat: 1,
			salad: 1,
			cheese: 1,
			bacon: 1,
		},
		totalPrice: 5,
	};

	componentDidMount() {

		let totalPrice = 0;
		const query = new URLSearchParams(this.props.location.search);
		if (!this.props.location.search) {
			alert('Please Orders Burger First!');
			this.props.history.push('/');

		}
		let ingredients = this.state.ingredients;
		for (let i of query.entries()) {
			ingredients[i[0]] = +i[1]
		}
		totalPrice = (4 + Object.keys(ingredients).map(i =>
			ingredients[i] * INGREDIENTS_PRICES[i]
		).reduce((acc, curr) => totalPrice = acc + curr)).toFixed(2);

		this.setState({ingredients: ingredients, totalPrice: totalPrice})
	}

	checkoutCanceled = () => {
		this.props.history.goBack();
	};
	checkoutContinued = () => {
		this.props.history.replace('/checkout/contact-data')

	};

	render() {
		return (
			<div>
				<CheckoutSummary
					ingredients={this.state.ingredients}
					totalPrice={this.state.totalPrice}
					cancel={this.checkoutCanceled}
					continue={this.checkoutContinued}
				/>

				<Route path={this.props.match.path + '/contact-data'}
				       render={(props) => <ContactData
					       ingredients={this.state.ingredients}
					       totalPrice={this.state.totalPrice}
					       {...props} />}/>
			</div>
		);
	}
}

export default Checkout;