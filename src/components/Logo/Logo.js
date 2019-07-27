import React from 'react'
import img from '../../assets/img/27.1 burger-logo.png.png'
import classes from './Logo.module.css'

const Logo = (props) => {
	return (
		<div className={classes.Logo} style={{height : props.height}}>
			<img src={img} alt="Logo"/>
		</div>
	);
};

export default Logo;
