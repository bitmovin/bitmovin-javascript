import {
  dateToApiRequestString,
  getFirstDayOfMonthFromDate,
  getFirstDayOfTheWeekFromDate,
  getLastDayOfMonthFromDate,
  getLastDayOfWeekFromDate,
  isValidApiRequestDateString
} from '../../bitmovin/utils/DateUtils';

const date = new Date(2017, 0, 5);

describe('Test getFirstDayOfMonthFromDate', () => {
  const firstDayOfMonth = getFirstDayOfMonthFromDate(date);
  it('should get the first day of the current month', () => {
    expect(firstDayOfMonth.getUTCDate()).toBe(1);
    expect(firstDayOfMonth.getMonth()).toBe(0);
    expect(firstDayOfMonth.getFullYear()).toBe(2017);
  });
});

describe('Test getLastDayOfMonthFromDate', () => {
  const lastDayOfMonth = getLastDayOfMonthFromDate(date);
  it('should get last day of the current month', () => {
    expect(lastDayOfMonth.getUTCDate()).toBe(31);
    expect(lastDayOfMonth.getUTCMonth()).toBe(0);
    expect(lastDayOfMonth.getUTCFullYear()).toBe(2017);
  });
});

describe('Test getFirstDayOfTheWeekFromDate', () => {
  const firstDayOfTheWeek = getFirstDayOfTheWeekFromDate(date);
  it('should get the first day of the current week', () => {
    expect(firstDayOfTheWeek.getUTCDate()).toBe(2);
    expect(firstDayOfTheWeek.getUTCMonth()).toBe(0);
    expect(firstDayOfTheWeek.getUTCFullYear()).toBe(2017);
  });

  const otherDate = new Date(2017, 2, 1);
  const firstDayOfTheWeekOver2Months = getFirstDayOfTheWeekFromDate(otherDate);
  it('should get first day of the week over two months', () => {
    expect(firstDayOfTheWeekOver2Months.getUTCDate()).toBe(27);
    expect(firstDayOfTheWeekOver2Months.getUTCMonth()).toBe(1);
    expect(firstDayOfTheWeekOver2Months.getUTCFullYear()).toBe(2017);
  });
});

describe('Test getLastDayOfWeekFromDate', () => {
  const lastDayOfWeek = getLastDayOfWeekFromDate(date);

  it('should get last day of the week', () => {
    expect(lastDayOfWeek.getUTCDate()).toBe(8);
    expect(lastDayOfWeek.getUTCMonth()).toBe(0);
    expect(lastDayOfWeek.getUTCFullYear()).toBe(2017);
  });

  const otherDate = new Date(2017, 2, 31);
  const lastDayOfWeekOver2Months = getLastDayOfWeekFromDate(otherDate);
  it('should get last day of the week over two months', () => {
    expect(lastDayOfWeekOver2Months.getUTCDate()).toBe(2);
    expect(lastDayOfWeekOver2Months.getUTCMonth()).toBe(3);
    expect(lastDayOfWeekOver2Months.getUTCFullYear()).toBe(2017);
  });
});

describe('Test dateToApiRequestString', () => {
  const dateString = dateToApiRequestString(date);
  it('Should be the format YYYY-MM-DD', () => {
    expect(dateString).toBe('2017-01-05');
  });
});

describe('Test isValidApiRequestDateString', () => {
  const validDateString = '2017-01-05';
  const wrongDateString = '123-124-123';

  it('Should return true', () => {
    expect(isValidApiRequestDateString(validDateString)).toBe(true);
  });

  it('Should return false', () => {
    expect(isValidApiRequestDateString(wrongDateString)).toBe(false);
    expect(isValidApiRequestDateString({})).toBe(false);
    expect(isValidApiRequestDateString(new Date())).toBe(false);
  });
});
