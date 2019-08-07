import React, {lazy, Suspense} from 'react';
import './App.module.css';
import Layout from './containers/Layout/Layout';
// import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/LogOut/Logout";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import * as actionCreators from './store/actions/actionCreators/authActionCreator'
import Spinner from "./components/UI/Spinner/Spinner";
/*
function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(actionCreators.authCheckState())
	}, []);
	return (
		<React.Fragment>

			<Layout>
				<Switch>
					<Route path='/checkout' component={Checkout}/>
					<Route path='/orders' component={Orders}/>
					<Route path='/auth' component={Auth}/>
					<Route path='/logout' component={Logout}/>
					<Route path='/' exact component={BurgerBuilder}/>

				</Switch>

			</Layout>
		</React.Fragment>
	);
}

export default App;*/

/*
const asyncCheckout = asyncComponent(() => {
	return import('./containers/Checkout/Checkout.js')
});
const asyncOrders = asyncComponent(() => {
	return import("./containers/Orders/Orders")
});
const asyncAuth = asyncComponent(() => {
	return import('./containers/Auth/Auth')
});
*/

const asyncCheckout = lazy(() => import('./containers/Checkout/Checkout.js'));
const asyncOrders = lazy(() => import('./containers/Orders/Orders'));
const asyncAuth = lazy(() => import('./containers/Auth/Auth'));
const BurgerBuilder = lazy(() => import('./containers/BurgerBuilder/BurgerBuilder'));

class App extends React.Component {

	componentDidMount() {
		this.props.checkAuth();
	}

	render() {
		let route;
		// There is two ways of doing this, either with the old way with asyncComponent or the new way with lazy, i chose the new one.
		if (this.props.isAuthenticated) {
			/*			route = (

					<Switch>
						<Route path='/auth' component={asyncAuth}/>
						<Route path='/orders' component={asyncOrders}/>
						<Route path='/checkout' component={asyncCheckout}/>
						<Route path='/logout' component={Logout}/>
						<Route path='/' exact component={BurgerBuilder}/>
						<Redirect to='/'/>
					</Switch>
				)*/
			route = (
				<Suspense fallback={<Spinner/>}>
					<Switch>
						<Route path='/auth' component={asyncAuth}/>
						<Route path='/orders' component={asyncOrders}/>
						<Route path='/checkout' component={asyncCheckout}/>
						<Route path='/logout' component={Logout}/>
						<Route path='/' exact component={BurgerBuilder}/>
						<Redirect to='/'/>
					</Switch>
				</Suspense>);
		} else if (!this.props.isAuthenticated) {
			/*		route = (
						<Switch>
							<Route path='/auth' component={asyncAuth}/>
							<Route path='/' exact component={BurgerBuilder}/>
							<Redirect to='/'/>
						</Switch>
					)*/
			route = (
				<Suspense fallback={<Spinner/>}>
					<Switch>
						<Route path='/auth' component={asyncAuth}/>
						<Route path='/' exact component={BurgerBuilder}/>
					</Switch>
				</Suspense>);
		}
		return (
			<React.Fragment>
				<Layout>
					{route}
				</Layout>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.authReducer.token !== null,

	}
};
const mapDispatchToProps = dispatch => {
	return {
		checkAuth: () => dispatch(actionCreators.authCheckState())
	}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
