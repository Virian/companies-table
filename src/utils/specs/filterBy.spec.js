import filterBy from '../filterBy';

describe('filter by', () => {
  it('should return all elements containing given substring', () => {
    expect.assertions(4);

    const array = [
      { key: 'qwerty' },
      { key: 'werdfyhtrh' },
      { key: 'wewewewe' },
      { key: '9283niuf8wer' },
      { key: '9124824' },
      { key: 'niuueoewfm' },
    ];

    const result = filterBy(array, 'wer', ['key']);

    expect(result).toHaveLength(3);
    expect(result).toContainEqual({ key: 'qwerty' });
    expect(result).toContainEqual({ key: 'werdfyhtrh' });
    expect(result).toContainEqual({ key: '9283niuf8wer' });
  });

  it('should only return elements that have a match on given keys', () => {
    expect.assertions(3);

    const array = [
      {
        key1: 'qwerty',
        key2: 'asdasd',
        key3: 'zxczxc',
      },
      {
        key1: 'dfgdfgdfg',
        key2: 'werdfyhtrh',
        key3: 'vbnvbnvbn',
      },
      {
        key1: 'piopiopio',
        key2: 'yjkyjkyjk',
        key3: 'wewewewe',
      },
      {
        key1: '9283niuf8wer',
        key2: 'bhnbhnbhn',
        key3: 'mtrmtrmtr',
      },
      {
        key1: '5252352',
        key2: '9124824',
        key3: '9766442',
      },
      {
        key1: 'tgbgtbtgb',
        key2: 'qwdqwdqwd',
        key3: 'niuueoewfm',
      },
    ];

    const result = filterBy(array, 'wer', ['key1', 'key3']);

    expect(result).toHaveLength(2);
    expect(result).toContainEqual({
      key1: 'qwerty',
      key2: 'asdasd',
      key3: 'zxczxc',
    });
    expect(result).toContainEqual({
      key1: '9283niuf8wer',
      key2: 'bhnbhnbhn',
      key3: 'mtrmtrmtr',
    });
  });

  it('should find matches for numbers', () => {
    expect.assertions(7);

    const array = [
      { key: 123123 },
      { key: 84237812345 },
      { key: 60516431 },
      { key: 123634 },
      { key: 63462123 },
      { key: 5345 },
      { key: 44.123 },
      { key: 55.031234555 },
    ];

    const result = filterBy(array, 123, ['key']);

    expect(result).toHaveLength(6);
    expect(result).toContainEqual({ key: 123123 });
    expect(result).toContainEqual({ key: 84237812345 });
    expect(result).toContainEqual({ key: 123634 });
    expect(result).toContainEqual({ key: 63462123 });
    expect(result).toContainEqual({ key: 44.123 });
    expect(result).toContainEqual({ key: 55.031234555 });
  });

  it('should find matches case insensitive', () => {
    expect.assertions(4);

    const array = [
      { key: 'qwerty' },
      { key: 'WERdfyhtrh' },
      { key: 'wewewewe' },
      { key: '9283niuf8wEr' },
      { key: '9124824' },
      { key: 'niuueoewfm' },
    ];

    const result = filterBy(array, 'wer', ['key']);

    expect(result).toHaveLength(3);
    expect(result).toContainEqual({ key: 'qwerty' });
    expect(result).toContainEqual({ key: 'WERdfyhtrh' });
    expect(result).toContainEqual({ key: '9283niuf8wEr' });
  });

  it('should find matches disregarding spaces and special characters', () => {
    expect.assertions(4);

    const array = [
      { key: 'qwe  rty' },
      { key: 'w!@#$%e^&*()r' },
      { key: 'wewewewe' },
      { key: 'w-_=+[]|e;\\\'",.<>/?`~r' },
      { key: '9124824' },
      { key: 'niuueoewfm' },
    ];

    const result = filterBy(array, 'wer', ['key']);

    expect(result).toHaveLength(3);
    expect(result).toContainEqual({ key: 'qwe  rty' });
    expect(result).toContainEqual({ key: 'w!@#$%e^&*()r' });
    expect(result).toContainEqual({ key: 'w-_=+[]|e;\\\'",.<>/?`~r' });
  });
});
