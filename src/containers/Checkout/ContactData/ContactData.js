import React from 'react';
import classes from './ContactData.module.css';
import Buttons from "../../../components/UI/Buttons/Buttons";
import axios from '../../../axios/axiosOrders.js'
import Spinner from "../../../components/UI/Spinner/Spinner";


class ContactData extends React.Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: ''
		},
		loading: false,
		showModel: false,

	};

	orderHandler = (event) => {
		this.setState({loading: true});
		event.preventDefault();

		const order = {
			ingredients: this.props.ingredients,
			totalPrice: this.props.totalPrice,
			address: {
				street: 'southernSt',
				country: 'PS',
				city: 'Tulkarm',
			}
		};

		axios.post("orders.json ", order)
			.then(response => {
				if (response) {
					alert("DONE!")
				}
				this.setState({loading: false});
				this.props.history.push('/');
			})
			.catch(err => this.setState({loading: false}));
	};

	render() {

		let form = (
			<React.Fragment>

				<h4>Enter Your Data Please</h4>
				<form>
					<input className={classes.Input} type='text' name='name' placeholder='Your Name'/>
					<input className={classes.Input} type='email' name='email' placeholder='Your Email'/>
					<input className={classes.Input} type='text' name='street' placeholder='Street'/>
					<input className={classes.Input} type='text' name='postal' placeholder='Postal Code'/>
					<Buttons btnType='Success' clicked={this.orderHandler}>Order</Buttons>
				</form>
			</React.Fragment>);
		if (this.state.loading) {
			form = <Spinner/>
		}

		return (
			<div className={classes.ContactData}>
				{form}
			</div>
		);
	}
}

export default ContactData;