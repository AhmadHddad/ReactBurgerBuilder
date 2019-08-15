import axios from '../axios/axiosOrders';

export const usePrices =()=>{
	axios.get('/Prices.json')
		.then(res=> console.log('res from prices', res.data))
		.catch(err=>console.log('errPrices', err));

	return{
		salad: 0.2,
		bacon: 0.9,
		cheese: 0.3,
		meat: 1.2
	}
};