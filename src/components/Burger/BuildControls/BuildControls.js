import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";


const BuildControls = props => {
	const controls = [
		{label: "Salad", type: "salad"},
		{label: "Bacon", type: "bacon"},
		{label: "Cheese", type: "cheese"},
		{label: "Meat", type: "meat"}
	];

	let buildControlMapping = controls.map(ctrl => {
		return (
			<BuildControl
				key={ctrl.label}
				label={ctrl.label}
				ingredientAdded={() => props.ingredientAdded(ctrl.type)}
				ingredientRemoved={() => props.ingredientRemoved(ctrl.type)}
				disabledInfo={props.disabledInfo[ctrl.type]}
				prices={props.prices[ctrl.type]}
			/>
		);
	});

	return (
		<React.Fragment>
			<div className={classes.BuildControls}>
				<p>
					Current Price: <strong>{props.totalPrice}$</strong>
				</p>

				{buildControlMapping}

				{props.bottomButton}

				{/*<OrderButton
				className={'Order'}
				disabled={!props.purchasable}
				clicked={props.purchasing}>
					{props.isAuthenticated ? 'Order Now' : 'Sign-in to order'}
				</OrderButton>*/}
			</div>
		</React.Fragment>
	);
};

export default BuildControls;
