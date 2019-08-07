import React from 'react';
import {connect} from "react-redux";
import * as actionCreator from '../../../store/actions/actionCreators/authActionCreator';
import * as orderActionCreators from '../../../store/actions/actionCreators/orderActionCreator';

import {Redirect} from 'react-router-dom';

class Logout extends React.Component {

	componentDidMount() {
		this.props.resetState();
		this.props.logOut();
	}

	render() {

		return ( <Redirect to="/"/>
		);
	}
}

const mapDispatchToProps = dispatch =>{
	return{
		logOut:()=>dispatch(actionCreator.logOut()),
		resetState:() =>dispatch(orderActionCreators.resetIngredients())
	}
};

export default connect(null,mapDispatchToProps)(Logout);