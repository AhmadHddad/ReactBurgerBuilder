import React from 'react';
import classes from './Model.module.css';
import Backdrop from '../Backdrop/Backdrop'


class Model extends React.Component {

	shouldComponentUpdate(prevProps, nextState) {
		return (prevProps.show !== this.props.show || this.props.children!==prevProps.children);
	}

	render() {

		return (

			<React.Fragment>
				<div
					style={{
						transform: this.props.show ? 'translateY(0)' : 'translateY(50px)',
						opacity: this.props.show ? '1' : '0',
						visibility: this.props.show ? 'visible' : 'hidden',
					}}
					className={classes.Modal}
				>
					{this.props.children}
				</div>
				<Backdrop hide={this.props.hide}
				          show={this.props.show}/>
			</React.Fragment>
		);
	}

};

export default Model;
