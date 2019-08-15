import React from 'react'
import classes from './SuccessDangerButton.module.css'


const SuccessDangerButton = (props) => (
		<button onClick={props.clicked}
		        className={[classes.Button, classes[props.btnType]].join(' ')}
		        disabled={props.disabled}>
			{props.children}
		</button>
	)
;

export default SuccessDangerButton;


