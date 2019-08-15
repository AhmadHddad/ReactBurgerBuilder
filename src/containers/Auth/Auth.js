import React from 'react';
import Input from "../../components/UI/Input/Input";
import SuccessDangerButton from "../../components/UI/Buttons/SuccessDangerButton/SuccessDangerButton";
import classes from './Auth.module.css';
import {connect} from 'react-redux';
import * as actionCreator from '../../store/actions/actionCreators/authActionCreator';
import Spinner from "../../components/UI/Spinner/Spinner";
import {checkValidity} from "../../shared/checkValidity";


class Auth extends React.Component {

	state = {
		controls: {
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your Email'
				},
				value: '',
				validation: {
					required: true,
					isEmail: true,
				},
				valid: false,
				touched: false
			},
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'Your Password'
				},
				value: '',
				validation: {
					required: true,
					minLength: 6,
				},
				valid: false,
				touched: false
			},
		},
		isSignUp: true,
		ingredientsSum: 0
	};

	inputChangedHandler = (event, id) => {
		const updatedControlsElement = {
			...this.state.controls,
			[id]: {
				...this.state.controls[id],
				value: event.target.value,
				touched: true,
				valid: checkValidity(event.target.value, this.state.controls[id].validation)

			}
		};
		this.setState({controls: updatedControlsElement})

	};

	authHandler = (event) => {
		event.preventDefault();
		let totalIngredientsSub = [];
		if (this.props.ingredients) {
			Object.keys(this.props.ingredients).map(key => totalIngredientsSub.push(this.props.ingredients[key]));
			totalIngredientsSub = totalIngredientsSub.reduce((prev, curr) => prev + curr);
			this.setState({ingredientsSum: totalIngredientsSub});
		}
		this.props.auth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
	};

	switchSignUp = () => {
		this.setState(prevState => {
			return {isSignUp: !prevState.isSignUp}
		})
	};

	componentDidUpdate() {
		if (this.props.isAuthenticated) {
			if (this.state.ingredientsSum > 0) {
				this.props.history.replace('/checkout')
			} else {
				this.props.history.replace('/')
			}
		}
	}

	render() {

		let formElementArray = [];
		for (let key in this.state.controls) {
			formElementArray.push({
				id: key,
				config: this.state.controls[key]
			});
		}
		let form;
		if (this.props.loading) {
			form = <Spinner/>;
		} else {
			form = formElementArray.map((formE) => {
				return <Input elementType={formE.config.elementType}
				              elementConfig={formE.config.elementConfig}
				              key={formE.id}
				              changed={(event) => this.inputChangedHandler(event, formE.id)}
				              value={formE.config.value}
				              inValid={!formE.config.valid}
				              required={formE.config.validation}
				              touched={formE.config.touched}
				/>
			});
		}

		return (
			<div className={classes.Auth}>
				<form onSubmit={this.authHandler}>
					{form}
					<SuccessDangerButton btnType='Success'>Submit!</SuccessDangerButton>
				</form>
				<SuccessDangerButton clicked={this.switchSignUp}
				                     btnType='Danger'>{this.state.isSignUp ? 'Sign In ?' : 'Sign Up ?'}</SuccessDangerButton>
				<p>{this.props.err ? this.props.err.message : null}</p>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		loading: state.authReducer.loading,
		err: state.authReducer.err,
		isAuthenticated: state.authReducer.token !== null,
		ingredients: state.burgerBuilderReducer.ingredients
	}
};
const mapDispatchToProps = dispatch => {
	return {
		auth: (email, pass, isSignUp) => {
			dispatch(actionCreator.auth(email, pass, isSignUp))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);