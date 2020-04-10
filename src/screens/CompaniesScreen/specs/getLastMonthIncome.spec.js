import getLastMonthIncome from '../getLastMonthIncome';

describe('get last month income', () => {
  it('should calculate total income for last month given as a date object', () => {
    expect.assertions(1);

    const incomes = [
      { value: '5005.41', date: '2019-08-23T17:22:37.202Z' },
      { value: '6881.44', date: '2019-04-17T18:29:24.192Z' },
      { value: '2425.33', date: '2019-03-31T18:32:46.028Z' },
      { value: '6926.45', date: '2019-08-24T18:56:37.408Z' },
      { value: '7122.84', date: '2019-05-16T09:56:59.341Z' },
      { value: '4566.71', date: '2019-08-18T15:41:00.380Z' },
    ];
    const lastDate = new Date('2019-08-29');

    const result = getLastMonthIncome(incomes, lastDate);

    expect(result).toBeCloseTo(5005.41 + 6926.45 + 4566.71, 5);
  });
});
