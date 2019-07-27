import React from 'react';
import Order from "../../components/Order/Order";
import axios from '../../axios/axiosOrders.js';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';


class Orders extends React.Component {
	state = {
		orders: [],
		loading: true,
	};

	componentDidMount() {
		axios.get('orders.json')
			.then(response => {

					let fetchOrders = [];
					for (let key in response.data) {
						fetchOrders.push({
							...response.data[key],
							id: key
						})}
				this.setState({orders: fetchOrders, loading: false})
			})
			.catch(err => console.log('this is Er ror from Orders', err));

	}

	render() {
		let orders = this.state.orders.map(order => {
			console.log('this is key', order.ingredients.bacon);
			return <Order
				key={order.id}
				ingredients={order.ingredients}
				totalPrice={order.totalPrice}/>
		});

		return (
			<div>
				{orders}
			</div>
		);
	}
}

export default withErrorHandler(Orders, axios);