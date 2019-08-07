import React from 'react';
import Order from "../../components/Order/Order";
import axios from '../../axios/axiosOrders.js';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actionCreator from '../../store/actions/actionCreators/orderActionCreator';
import {connect} from 'react-redux';


class Orders extends React.Component {

	componentDidMount() {
		this.props.fetchOrders(this.props.token, this.props.userId)

	}

	render() {
		let orders;
		if (this.props.loading) {
			orders = <Spinner/>
		} else if (!this.props.orders[0]) {
			return orders = <div style={{textAlign: 'center'}}>There is no orders yet!!</div>
		} else {
			console.log('this is this.props.orders', this.props.orders);
			orders = this.props.orders.map(order => {
				return (
					<React.Fragment>
						<Order
							key={order.id}
							ingredients={order.ingredients}
							totalPrice={order.totalPrice}/>
					</React.Fragment>)
			});
		}

		return (
			<div>
				{orders}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		orders: state.orderReducer.orders,
		loading: state.orderReducer.loading,
		token: state.authReducer.token,
		userId: state.authReducer.userId,

	}
};
const mapDispatchToProps = dispatch => {
	return {
		fetchOrders: (token, userId) => {
			dispatch(actionCreator.fetchOrders(token, userId))
		},

	}
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));