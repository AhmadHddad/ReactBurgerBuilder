import React from 'react'
import classes from './SpecialButton.module.css';

const SpecialButton = (props) => {
	return (

		<button
			className={classes[props.className]}
			onClick={props.clicked}
			disabled={props.disabled}
		>
			{props.children}
		</button>
	);
};


export default SpecialButton;
