import React from "react";
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";


class Layout extends React.Component {

	state = {
		showSideDrawer: false
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
				/>
				<SideDrawer
					show={this.state.showSideDrawer}
					hide={this.sideDrawerCloseHandler}/>
				<main className={classes.Content}>
					{this.props.children}
				</main>

			</React.Fragment>

		)
	}
}

export default Layout;
