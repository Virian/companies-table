import getSumAndLastDate from '../getSumAndLastDate';

describe('get sum and last date', () => {
  it('should calculate total income and latest date of income', () => {
    expect.assertions(2);

    const incomes = [
      { value: '5005.41', date: '2019-08-23T17:22:37.202Z' },
      { value: '6881.44', date: '2019-04-17T18:29:24.192Z' },
      { value: '2425.33', date: '2019-03-31T18:32:46.028Z' },
      { value: '6926.45', date: '2019-08-24T18:56:37.408Z' },
      { value: '7122.84', date: '2019-05-16T09:56:59.341Z' },
      { value: '4566.71', date: '2019-08-18T15:41:00.380Z' },
    ];
    const correctSum = 5005.41 + 6881.44 + 2425.33 + 6926.45 + 7122.84 + 4566.71;
    const correctDate = new Date('2019-08-24T18:56:37.408Z');

    const { sum, lastDate } = getSumAndLastDate(incomes);

    expect(sum).toBeCloseTo(correctSum, 5);
    expect(lastDate.getTime()).toStrictEqual(correctDate.getTime());
  });
});
