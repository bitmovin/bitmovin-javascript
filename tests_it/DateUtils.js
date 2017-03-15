export const getFirstDayOfCurrentMonth = (currentDate = new Date()) => {
  return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
};

export const getLastDayOfCurrentMonth = (currentDate = new Date()) => {
  return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
};

export const getMondayOfCurrentWeek = (currentDate = new Date()) => {
  const day = currentDate.getDay();
  return new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + (day == 0?-6:1) - day );
};

export const getSundayOfCurrentWeek = (currentDate = new Date()) => {
  const day = currentDate.getDay();
  return new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + (day == 0?0:7)-day );
};

export const dateToApiRequestString = (date) => {
  const month = (date.getMonth()+1);
  const monthStr = month<10? ('0' + month): month;
  const dateStr = date.getDate()< 10? ('0' + date.getDate()): date.getDate();
  return date.getFullYear() + '-' + monthStr + '-' + dateStr;
};