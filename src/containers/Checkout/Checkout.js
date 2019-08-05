import React from 'react';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from "react-redux";


class Checkout extends React.Component {

	componentDidMount() {
		if (this.props.totalPrice <= 4) {
			alert('Please Orders Burger First!');
			this.props.history.replace('/');
		}
	}

	checkoutCanceled = () => {
		this.props.history.goBack();
	};
	checkoutContinued = () => {
		this.props.history.replace('/checkout/contact-data')

	};

	render() {
		console.log('this is Checkout' );
		return (
			<div>
				<CheckoutSummary
					cancel={this.checkoutCanceled}
					continue={this.checkoutContinued}
					ingredients={this.props.ingredients}
					totalPrice={this.props.totalPrice}
				/>

				<Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
			</div>
		);
	}
}

const mapStateToProps = state => {

	return {
		ingredients: state.burgerBuilderReducer.ingredients,
		totalPrice: state.burgerBuilderReducer.totalPrice,
	};
};
export default connect(mapStateToProps)(Checkout);