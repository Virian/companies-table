import quickSortBy from '../quickSortBy';

describe('quick sort by', () => {
  it('should sort array ascending', () => {
    expect.assertions(10);

    const array = [
      { number: 8, string: 'Poland' },
      { number: 1, string: 'United States' },
      { number: 4, string: 'Austria' },
      { number: 2, string: 'New Zealand' },
      { number: 5, string: 'Denmark' },
    ];

    const sortedByNumber = quickSortBy(array, 'number');
    const sortedByString = quickSortBy(array, 'string', 'asc');

    expect(sortedByNumber[0]).toStrictEqual({ number: 1, string: 'United States' });
    expect(sortedByNumber[1]).toStrictEqual({ number: 2, string: 'New Zealand' });
    expect(sortedByNumber[2]).toStrictEqual({ number: 4, string: 'Austria' });
    expect(sortedByNumber[3]).toStrictEqual({ number: 5, string: 'Denmark' });
    expect(sortedByNumber[4]).toStrictEqual({ number: 8, string: 'Poland' });

    expect(sortedByString[0]).toStrictEqual({ number: 4, string: 'Austria' });
    expect(sortedByString[1]).toStrictEqual({ number: 5, string: 'Denmark' });
    expect(sortedByString[2]).toStrictEqual({ number: 2, string: 'New Zealand' });
    expect(sortedByString[3]).toStrictEqual({ number: 8, string: 'Poland' });
    expect(sortedByString[4]).toStrictEqual({ number: 1, string: 'United States' });
  });

  it('should sort array descending', () => {
    expect.assertions(10);

    const array = [
      { number: 8, string: 'Poland' },
      { number: 1, string: 'United States' },
      { number: 4, string: 'Austria' },
      { number: 2, string: 'New Zealand' },
      { number: 5, string: 'Denmark' },
    ];

    const sortedByNumber = quickSortBy(array, 'number', 'desc');
    const sortedByString = quickSortBy(array, 'string', 'desc');

    expect(sortedByNumber[0]).toStrictEqual({ number: 8, string: 'Poland' });
    expect(sortedByNumber[1]).toStrictEqual({ number: 5, string: 'Denmark' });
    expect(sortedByNumber[2]).toStrictEqual({ number: 4, string: 'Austria' });
    expect(sortedByNumber[3]).toStrictEqual({ number: 2, string: 'New Zealand' });
    expect(sortedByNumber[4]).toStrictEqual({ number: 1, string: 'United States' });

    expect(sortedByString[0]).toStrictEqual({ number: 1, string: 'United States' });
    expect(sortedByString[1]).toStrictEqual({ number: 8, string: 'Poland' });
    expect(sortedByString[2]).toStrictEqual({ number: 2, string: 'New Zealand' });
    expect(sortedByString[3]).toStrictEqual({ number: 5, string: 'Denmark' });
    expect(sortedByString[4]).toStrictEqual({ number: 4, string: 'Austria' });
  });
});
