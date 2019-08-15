import React from 'react'
import Button from '../../UI/Buttons/SuccessDangerButton/SuccessDangerButton'


const OrderSummery = (props) => {
	const ingredientSummery = Object.keys(props.ingredients).map((igkeys) => {
		return <li key={igkeys}>
			<span style={{textTransform: 'capitalize'}}>{igkeys}</span>:{props.ingredients[igkeys]}
		</li>
	});

	return (
		<React.Fragment>
			<h3>Your Order</h3>
			<p>A delicious burger with the following ingredients:</p>
			<ul>
				{ingredientSummery}
			</ul>
			<p>Total Price = <strong>${props.totalPrice}</strong></p>
			<p>Continue to checkout ?</p>
			<Button clicked={props.cancel} btnType={'Danger'}>Cancel!!</Button>
			<Button clicked={props.continue} btnType={'Success'}>Continue</Button>
		</React.Fragment>
	);

};

export default OrderSummery;
