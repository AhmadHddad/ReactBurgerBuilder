import React from 'react';
import classes from './ContactData.module.css';
import Buttons from "../../../components/UI/Buttons/Buttons";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import axios from '../../../axios/axiosOrders';
import {connect} from "react-redux";
import withErrorHandler from "../../../HOC/withErrorHandler/withErrorHandler";
import * as actionCreator from '../../../store/actions/actionCreators/orderActionCreator'


class ContactData extends React.Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your St',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your ZIP Code',
				},
				value: '',
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5
				},
				valid: false,
				touched: false

			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false

			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your Email',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false

			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{value: 'fastest', displayValue: 'Fastest'},
						{value: 'cheapest', displayValue: 'Cheapest'},
					]
				},
				value: 'cheapest',
				valid: true,
			},

		},
		showModel: false,
		formIsValid: false,

	};

	checkValidity = (value, validation) => {
		let isValid = true;
		if (validation) {

			if (validation.required) {
				isValid = value.trim() !== '' && isValid
			}
			if (validation.minLength) {
				isValid = value.length >= validation.minLength && isValid
			}
			if (validation.maxLength) {
				isValid = value.length <= validation.maxLength && isValid
			}
		}
		return isValid;
	};

	componentDidUpdate() {
		if (this.props.purchased) {
			this.props.history.push('/');

		}
	}

	orderHandler = (event) => {
		event.preventDefault();

		let orderData = {};
		for (let key in this.state.orderForm) {
			orderData[key] = this.state.orderForm[key].value
		}
		const order = {
			ingredients: this.props.ingredients,
			totalPrice: this.props.totalPrice,
			orderData: orderData

		};
		this.props.purchaseBurger(order);

	};

	inputChangedHandler = (event, id) => {
		const updatedOrderForm = {...this.state.orderForm};
		const updatedFormElement = {
			...updatedOrderForm[id]
		};
		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
		updatedFormElement.touched = true;
		updatedOrderForm[id] = updatedFormElement;

		let formIsValid = true;
		for (let key in updatedOrderForm) {
			formIsValid = updatedOrderForm[key].valid && formIsValid;
		}

		this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid})
	};

	render() {

		let formElementArray = [];
		for (let key in this.state.orderForm) {
			formElementArray.push({
				id: key,
				config: this.state.orderForm[key]
			});
		}

		let form = (
			<React.Fragment>

				<h4>Enter Your Data Please</h4>
				<form onSubmit={this.orderHandler}>
					{
						formElementArray.map((formE) => {
							return <Input elementType={formE.config.elementType}
							              elementConfig={formE.config.elementConfig}
							              key={formE.id}
							              changed={(event) => this.inputChangedHandler(event, formE.id)}
							              value={formE.config.value}
							              inValid={!formE.config.valid}
							              required={formE.config.validation}
							              touched={formE.config.touched}
							/>
						})
					}
					<Buttons disabled={!this.state.formIsValid} btnType='Success'>Order</Buttons>
				</form>
			</React.Fragment>);
		if (this.props.loading) {
			form = <Spinner/>
		}

		return (
			<div className={classes.ContactData}>
				{form}
			</div>
		);
	}
}

const mapStateToProps = state => {

	return {
		ingredients: state.burgerBuilderReducer.ingredients,
		totalPrice: state.burgerBuilderReducer.totalPrice,
		loading: state.orderReducer.loading,
		purchased: state.orderReducer.purchased
	};
};

const mapDispatchToProps = dispatch => {
	return {
		purchaseBurger: (order) => dispatch(actionCreator.purchaseBurger(order))
	}
};
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
