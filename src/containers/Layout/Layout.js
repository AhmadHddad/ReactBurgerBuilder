import React from "react";
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import {connect} from 'react-redux';

class Layout extends React.Component {

	state = {
		showSideDrawer: false,
	};

	sideDrawerCloseHandler = () => {
		this.setState({showSideDrawer: false})
	};

	sideDrawerToggleHandler = () => {
		this.setState((prevState) => {
			return {showSideDrawer: !prevState.showSideDrawer}
		})
	};

	render() {

		return (
			<React.Fragment>
				<Toolbar
					toggle={this.sideDrawerToggleHandler}
					isAuthenticated={this.props.isAuthenticated}
					logOut={this.logOut}
				/>
				<SideDrawer
					show={this.state.showSideDrawer}
					hide={this.sideDrawerCloseHandler}
					isAuthenticated={this.props.isAuthenticated}
					/>
				<main className={classes.Content}>
					{this.props.children}
				</main>
			</React.Fragment>

		)
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.authReducer.token !== null,
	}
};

export default connect(mapStateToProps)(Layout);
