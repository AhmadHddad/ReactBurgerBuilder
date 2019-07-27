import axios from 'axios';


const instance = axios.create({
	baseURL: 'https://burgerbuilderreactapp-e9510.firebaseio.com/'
});

export default instance;