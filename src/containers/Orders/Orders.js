import React from 'react';
import Order from "../../components/Order/Order";
import axios from '../../axios/axiosOrders.js';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actionCreator from '../../store/actions/actionCreators/orderActionCreator';
import {connect} from 'react-redux';
import ChangeOrder from "./ChangeOrder/ChangeOrder";
import Model from "../../components/UI/Model/Model";
import classes from './Orders.module.css';


class Orders extends React.Component {


	componentDidMount() {
		this.props.fetchOrders(this.props.token, this.props.userId)
	}

	goToUpdate = (orderId) => {
		this.props.setOrderToUpdate(orderId, this.props.prices)
	};

	cancelUpdateHandler = () => {
		this.props.updateCancel();
	};

	render() {
		let orders;
		if (this.props.loading) {
			orders = <Spinner/>
		} else if (!this.props.orders[0]) {
			return orders = <div style={{textAlign: 'center'}}>There is no orders yet!!</div>
		} else {
			orders = this.props.orders.map(order => {
				return (
					<React.Fragment key={order.id}>
						<Order
							update={() => this.goToUpdate(order.id)}
							delete={() => this.props.deleteOrder(order.id)}
							ingredients={order.ingredients}
							totalPrice={order.totalPrice}/>
					</React.Fragment>)
			});
		}
		return (
			<React.Fragment>
				<div className={classes.updateModel}>
					<Model show={this.props.updating}
					       hide={this.cancelUpdateHandler}
					       updating={this.props.updating}>
						<ChangeOrder
							updating={this.props.updating}
							orderToUpdate={this.props.orderToUpdate}
							prices={this.props.prices}
							{...this.props}
						/>
					</Model>
				</div>
				<div>
					{orders}
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		orders: state.orderReducer.orders,
		loading: state.orderReducer.loading,
		updating: state.orderReducer.updating,
		orderToUpdate: state.orderReducer.orderToUpdate,
		ingredientsToUpdate: state.orderReducer.ingredientsToUpdate,
		token: state.authReducer.token,
		userId: state.authReducer.userId,
		prices: state.burgerBuilderReducer.prices

	}
};
const mapDispatchToProps = dispatch => {
	return {
		fetchOrders: (token, userId) => {
			dispatch(actionCreator.fetchOrders(token, userId))
		},
		deleteOrder: (orderId, userId) => {
			dispatch(actionCreator.deleteOrder(orderId, userId))
		},
		setOrderToUpdate: (orderId, prices) => {
			dispatch(actionCreator.setOrderToUpdate(orderId, prices))
		},
		updateCancel:()=>{
			dispatch(actionCreator.updateCancel())
		}

	}
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));