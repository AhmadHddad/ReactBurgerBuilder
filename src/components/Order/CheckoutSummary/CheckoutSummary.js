import React from 'react'
import Burger from "../../Burger/Burger";
import Buttons from "../../UI/Buttons/Buttons";
import classes from './ChackoutSummary.module.css';


const CheckoutSummary = (props) => {
	return (
		<div className={classes.CheckoutSummary}>
			<h1> We hope it tastes well ! :D </h1>
			<div style={{width: '100%', margin: 'auto'}}>
				<Burger ingredients={props.ingredients}/>
				<p> Total Price: $ <strong>{props.totalPrice}</strong></p>
				<Buttons clicked={props.cancel} btnType={'Danger'}>Cancel</Buttons>
				<Buttons clicked={props.continue} btnType={'Success'}>Continue</Buttons>
			</div>

		</div>
	);
};

export default CheckoutSummary;
