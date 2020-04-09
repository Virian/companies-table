import axios from '..';

export default (incomeId) => axios.get(`/incomes/${incomeId}`);
