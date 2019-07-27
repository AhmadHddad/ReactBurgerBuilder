import classes from "./BuildControl.module.css";
import React from "react";


const BuildControl = props => {
	return (
		<div className={classes.BuildControl}>
			<div className={classes.Label}> {props.label}:${props.prices} </div>
			<button className={classes.Less} onClick={props.ingredientRemoved} disabled={!props.disabledInfo}>Less
			</button>
			<button className={classes.More} onClick={props.ingredientAdded}>More</button>


		</div>
	);
};

export default BuildControl;
