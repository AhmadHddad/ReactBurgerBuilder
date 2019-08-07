import React from 'react'
import Model from "../../components/UI/Model/Model";


const withErrorHandler = (WrappedComponent, axios) => {

	return class extends React.Component {

		state = {
			error: null
		};


		constructor(props, context) {
			super(props, context);

			try {
				this.reqInterceptor = axios.interceptors.request.use(req => {
					this.setState({error: null});
					return req
				}, err => this.setState({error: err}));
				this.resInterceptor = axios.interceptors.response.use(res => res, (err) => {
					this.setState({error: err});
				})
			}
			catch (e) {
				console.log('this is error from try and catch',e );
			}
		}


		componentWillUnmount() {
			axios.interceptors.request.eject(this.reqInterceptor);
			axios.interceptors.request.eject(this.resInterceptor);
		}

		errorConfirmedHandler = () => {
			this.setState({error: null})
		};

		render() {
			return (
				<React.Fragment>
					<Model show={this.state.error != null}
					       hide={this.errorConfirmedHandler}>
						{this.state.error ? this.state.error.message : null}

					</Model>
					<WrappedComponent {...this.props}/>
				</React.Fragment>
			)
		}

	};
};

export default withErrorHandler;
