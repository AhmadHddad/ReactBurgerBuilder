import React,{useState} from 'react'

import Auth from './auth'
import Names from './names';
import {auth} from "../store/actions/actionCreators/authActionCreator";
const Testing = props => {

		const [toDoList , setToDoList] =  useState([]);
		const [userInputState,setInputValue]=  useState('');
		const [page, setPage ]= useState('auth');


		const userInputHandler = (event)=>{
			setInputValue(event.target.value)
		};

		const addToDO=() => {
			setToDoList(toDoList.concat(userInputState));
		};


		const pageChangeHandler = (page)=>{
			setPage(page)
		};



	return (
		<div>
			<input onChange={userInputHandler} value={userInputState}/>

			<button onClick={()=>{addToDO(userInputState)}}>Add</button>
			<p>
				{userInputState}
			</p>
			<ul>
				{toDoList.map((i)=>{
					return <li>{i}</li>
				})}
			</ul>
			<hr/>
			<button onClick={()=>{pageChangeHandler('auth')}}>auth</button>
			<button onClick={()=>{pageChangeHandler('names')}}>names</button>
			<hr/>
		{page === 'auth'?	<Auth />
			: <Names/>}
		</div>
	);
};


export default Testing;
