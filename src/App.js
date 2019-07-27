import React, {lazy} from 'react';
import './App.module.css';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
// import Checkout from "./containers/Orders/Checkout/Checkout";
import {Route,Switch} from "react-router-dom";
import Spinner from "./components/UI/Spinner/Spinner";
import Orders from "./containers/Orders/Orders";
const Checkout = lazy(() => import('./containers/Checkout/Checkout.js'));


function App() {
	return (
		<React.Fragment>

			<Layout>
				<Switch>
					<Route path='/' exact component={BurgerBuilder}/>
					<Route path='/orders' exact component={Orders}/>
					<React.Suspense fallback={<Spinner/>}>
						<Route path='/checkout' component={Checkout}/>
					</React.Suspense>
				</Switch>
			</Layout>
		</React.Fragment>
	);
}

export default App;
