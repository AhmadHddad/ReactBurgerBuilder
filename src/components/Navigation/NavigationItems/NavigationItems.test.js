// enzyme allows us to unit test,
// tests where we dont have to render the whole react project and only render the component it self.
// shallow func helps us render react components using enzyme,
// so it renders a simple shallow copy of the component and not the component tree,
// meaning the components inside the parent component are just going to be a placeholders
// and that would help us unit test the specific component.
import {configure, shallow} from 'enzyme';
// Adapter lets us configure the enzyme and connect it to our react app.
import Adapter from 'enzyme-adapter-react-16'

import React from 'react';
import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";


configure({adapter: new Adapter()});

describe('<NavigationItems/>', () => {
	let wrapper;
// beforeEach is a function that is excited before each of the tests
	beforeEach(() => {
		wrapper = shallow(<NavigationItems/>)
	});
	it('should render three <NavigationItems /> elements if not authenticated ', () => {
		expect(wrapper.find(NavigationItem)).toHaveLength(2);
	});
	it('should render three <NavigationItems /> elements if authenticated ', () => {
			wrapper.setProps({isAuthenticated:true});
		expect(wrapper.find(NavigationItem)).toHaveLength(3);
	});

	it('should render three <NavigationItems /> elements if not authenticated ', () => {
		wrapper.setProps({isAuthenticated:true});
		expect(wrapper.contains(<NavigationItem link={'/logout'}> Logout </NavigationItem>)).toEqual(true);
	});
});

// inside the it func we should make an instance out of the component and the adapter helps us with that.