import moment from 'moment';

export const getFirstDayOfMonthFromDate = (date = new Date()) => {
  return moment.utc(date).startOf('month').toDate();
};

export const getLastDayOfMonthFromDate = (date = new Date()) => {
  return moment.utc(date).endOf('month').toDate();
};

export const getFirstDayOfTheWeekFromDate = (date = new Date()) => {
  return moment.utc(date).startOf('isoWeek').toDate();
};

export const getLastDayOfWeekFromDate = (date = new Date()) => {
  return moment.utc(date).endOf('isoWeek').toDate();
};

export const dateToApiRequestString = (date) => {
  return moment(date).format('YYYY-MM-DD').toString();
};

export const isValidApiRequestDateString = (dateString) => {
  if (typeof dateString !== 'string')
    return false;

  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return dateString.match(regex) !== null;
};
