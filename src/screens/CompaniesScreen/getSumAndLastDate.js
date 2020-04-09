export default (incomes) => incomes.reduce((accumulator, { value, date }) => {
  const incomeDate = new Date(date);
  return {
    sum: accumulator.sum + parseFloat(value),
    lastDate: incomeDate > accumulator.lastDate ? incomeDate : accumulator.lastDate,
  };
}, { sum: 0, lastDate: null });
