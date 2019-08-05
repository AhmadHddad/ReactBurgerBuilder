import React from 'react'
import classes from './Buttons.module.css'


const Buttons = (props) => (
		<button onClick={props.clicked}
		        className={[classes.Button, classes[props.btnType]].join(' ')} disabled={props.disabled}>
			{props.children}
		</button>
	)
;

export default Buttons;


