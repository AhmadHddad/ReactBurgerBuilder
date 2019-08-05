import React from 'react'
import classes from './Input.module.css';


const Input = (props) => {
	let inputElement = null;
	let myClasses = [classes.InputElement];
	if (props.inValid && props.touched) {
		myClasses.push(classes.inValid)
	}
	switch (props.elementType) {
		case 'select':
			inputElement = <select value={props.value}
			                       className={classes.InputElement}
			                       onChange={props.changed}>
				{props.elementConfig.options.map((option) => {
					return <option key={option.value} value={option.value}>
						{option.displayValue}
					</option>
				})}
			</select>;
			break;
		case 'textarea':
			inputElement = <textarea {...props.elementConfig}
			                         value={props.value}
			                         className={myClasses.join(' ')}
			                         onChange={props.changed}/>;
			break;
		case 'input':
			inputElement = <input
				value={props.value}
				{...props.elementConfig}
				className={myClasses.join(' ')}
				onChange={props.changed}
				required={props.required}
			/>;
			break;
		default:
			inputElement = <Input {...props.elementConfig}
			                      value={props.value}
			                      className={myClasses.join(' ')}
			                      onChange={props.changed}
			                      required={props.required}

			/>

	}

	return (
		<div className={classes.Input}>
			<label className={classes.Label}>{props.label}</label>
			{inputElement}
		</div>

	);
};

export default Input;
