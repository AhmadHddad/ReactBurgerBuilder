import React, {useEffect} from 'react'
import Spinner from "../../../components/UI/Spinner/Spinner";
import SpecialButton from "../../../components/UI/Buttons/SpecialButton/SpecialButton";
import {useDispatch, useSelector} from "react-redux";
import * as actionCreators from '../../../store/actions/actionCreators/orderActionCreator';
import Burger from "../../../components/Burger/Burger";
import BuildControls from "../../../components/Burger/BuildControls/BuildControls";


const ChangeOrder = (props) => {

	const ingredientsToUpdate = useSelector(state => state.orderReducer.ingredientsToUpdate);
	const updatedTotalPrice = useSelector(state => state.orderReducer.updatedTotalPrice);
	const orderToUpdate = useSelector(state => state.orderReducer.orderToUpdate);
	const loading = useSelector(state => state.orderReducer.loading);
	const prices = props.prices;

	const dispatch = useDispatch();

	useEffect(() => {
		if (!props.prices) {
			props.history.push('/')
		} else {

		}

	}, []);

	const updateIngredientAdd = (ingredientName) => {
		dispatch(actionCreators.updateIngredientAdd(ingredientName, prices))
	};
	const updateIngredientRemove = (ingredientName) => {

		dispatch(actionCreators.updateIngredientRemove(ingredientName, prices))

	};
	const updateOrderFinish = (orderToUpdate, updatedIngredients, updatedTotalPrice) => {
		dispatch(actionCreators.submittingUpdate(orderToUpdate, updatedIngredients, updatedTotalPrice))

	};

	let burger = <Spinner/>;
	const disabledInfo = {...ingredientsToUpdate};

	if (orderToUpdate) {
		let saveButton = (
			<SpecialButton
				clicked={() => updateOrderFinish(orderToUpdate, disabledInfo, updatedTotalPrice)}
				className='Save'
				disabled={Number(updatedTotalPrice) <= 4}>
				Save
			</SpecialButton>);
		if (!loading) {

			burger = (
				<React.Fragment>
					<Burger ingredients={ingredientsToUpdate}/>
					<BuildControls
						totalPrice={updatedTotalPrice}
						ingredientAdded={updateIngredientAdd}
						ingredientRemoved={updateIngredientRemove}
						disabledInfo={disabledInfo}
						prices={prices}
						isAuthenticated
						bottomButton={saveButton}
					/>

				</React.Fragment>
			);
		}
	}

	return burger
};

export default ChangeOrder;
