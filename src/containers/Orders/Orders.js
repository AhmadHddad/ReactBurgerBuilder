import React from 'react';
import Order from "../../components/Order/Order";
import axios from '../../axios/axiosOrders.js';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actionCreator from '../../store/actions/actionCreators/orderActionCreator';
import {connect} from 'react-redux';

class Orders extends React.Component {

	componentDidMount() {
		this.props.fetchOrders();
	}

	render() {
		let orders;
		if (this.props.loading){
		orders=<Spinner/>
		}
		else {
			orders = this.props.orders.map(order => {
				return <Order
					key={order.id}
					ingredients={order.ingredients}
					totalPrice={order.totalPrice}/>
			});
		}


		return (
			<div>
				{orders}
			</div>
		);
	}
}

const mapStateToProps=state=>{
	return{
		orders: state.orderReducer.orders,
		loading:state.orderReducer.loading,
	}
};
const mapDispatchToProps =dispatch =>{
	return {
		fetchOrders: ()=>{dispatch(actionCreator.fetchOrders())}
	}
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));