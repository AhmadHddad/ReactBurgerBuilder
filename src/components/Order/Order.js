import React from 'react'
import classes from './Order.module.css';
import SuccessDangerButton from "../UI/Buttons/SuccessDangerButton/SuccessDangerButton";


const Order = (props) => {
	const ingredients = [];

	for (let ingredientName in props.ingredients) {
		ingredients.push({
			name: ingredientName,
	amount: props.ingredients[ingredientName]
		})
	}
	const ingredieantsOutput = ingredients.map(ig=>{
		return <span style={{textTransform:'capitalize',
		display:'inline-block',
		margin:'0 8px',
		border:'1px solid #ccc',
		padding:'5px '}}
			key={ig.name}>{' '}{ig.name} {' : '} {ig.amount}</span>
	});
	return (
		<div className={classes.Order} >
			<p>{ingredieantsOutput}</p>
			<p>Total Price = USD <strong>{props.totalPrice}</strong></p>
			<SuccessDangerButton btnType='Danger' clicked={props.delete}>Delete Order</SuccessDangerButton>
			<SuccessDangerButton btnType='Success' clicked={props.update}>Update Order</SuccessDangerButton>
		</div>
	);
};

export default Order;
