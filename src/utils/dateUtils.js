// This file includes date related helper functions used throughout

/* 
  The function returns an array of a week's dates starting from today's date and previous 6 days
  This function is used for weekly view
*/
export const getWeekRange = () => {
  const currentDate = new Date();
  let start = currentDate - 6 * 24 * 60 * 60 * 1000;
  const end = currentDate * 1;

  const res = [];

  while (start <= end) {
    const date = new Date(start);
    res.push({
      dateString: date.toISOString().substring(0, 10),
      date: date.getDate(),
      day: date.toDateString().substring(0, 3),
    });

    start = start + 24 * 60 * 60 * 1000;
  }

  return res;
};

// This function extracts Date from Date() object in "YYYY-MM-DD" format
export const getDateString = (date) => {
  return date.toISOString().substring(0, 10);
};

export const getPreviousDate = (date) => {
  const currentDate = new Date(date);
  const previousDate = new Date(currentDate - 24 * 60 * 60 * 1000);

  return getDateString(previousDate);
};
