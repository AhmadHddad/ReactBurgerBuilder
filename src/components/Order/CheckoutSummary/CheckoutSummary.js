import React from 'react'
import Burger from "../../Burger/Burger";
import SuccessDangerButton from "../../UI/Buttons/SuccessDangerButton/SuccessDangerButton";
import classes from './ChackoutSummary.module.css';


const CheckoutSummary = (props) => {
	return (
		<div className={classes.CheckoutSummary}>
			<h1> We hope it tastes well ! :D </h1>
			<div style={{width: '100%', margin: 'auto'}}>
				<Burger ingredients={props.ingredients}/>
				<p> Total Price: $ <strong>{props.totalPrice}</strong></p>
				<SuccessDangerButton clicked={props.cancel} btnType='Danger'>Cancel</SuccessDangerButton>
				<SuccessDangerButton clicked={props.continue} btnType='Success'>Continue</SuccessDangerButton>
			</div>

		</div>
	);
};

export default CheckoutSummary;
