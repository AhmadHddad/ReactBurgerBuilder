import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import {BurgerBuilder} from "./BurgerBuilder";
import {configure,shallow} from 'enzyme'
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
configure({adapter:new Adapter()});

describe('<BurgerBuilder/>', function () {
	let wrapper;
	beforeEach(()=>{
		wrapper= shallow(<BurgerBuilder initIngredients={()=>{}}/>)
	});
	it('should render <BuildControls/> when it receives ingredients', function () {
		wrapper.setProps({ingredients:{salad:0}});
			expect(wrapper.find(BuildControls)).toHaveLength(1);
	});
});