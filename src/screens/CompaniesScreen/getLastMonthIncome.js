export default (incomes, lastDate) => incomes.reduce((accumulator, { value, date }) => {
  const incomeDate = new Date(date);
  const isFromLastMonth = incomeDate.getMonth() === lastDate.getMonth()
    && incomeDate.getFullYear() === lastDate.getFullYear();
  return isFromLastMonth ? accumulator + parseFloat(value) : accumulator;
}, 0);
