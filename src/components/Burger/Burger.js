import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgeIngredients/BurgerIngredient";


const Burger = props => {

	let transformedIngredients;

	if (props.ingredients) {
		transformedIngredients = Object.keys(props.ingredients)
			.map(igKey => {
				return Array(...Array(props.ingredients[igKey])).map((x, i) => {
					return <BurgerIngredient key={igKey + i} type={igKey}/>;
				});
			})
			.reduce((acc, cur) => {
				return acc.concat(cur);
			}, []);
		if (transformedIngredients.length === 0) {
			transformedIngredients = <p>Please add more ingredients</p>;
		}

	} else {
		transformedIngredients = <p>Please Order First!!</p>
	}

	return (
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top"/>
			{transformedIngredients}
			<BurgerIngredient type="bread-bottom"/>
		</div>
	);
};

export default Burger;
