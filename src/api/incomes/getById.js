import axios from '../../services/fetch';

export default (incomeId) => axios.get(`/incomes/${incomeId}`);
