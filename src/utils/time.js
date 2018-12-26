import moment from 'moment';

const formatDigit = (digit) => {
  if (!digit) {
    return '00';
  }
  return digit > 9 ? digit : `0${digit}`;
}

const isToday = (date) => {
  const today = moment();
  return moment(date).isSame(today, 'day');
}

const isYesterday = (date) => {
  const yesterday = moment().subtract(1, 'day');
  return moment(date).isSame(yesterday, 'day');
}

export const formatTime = (time = {}, options = {}) => {
  const hours = formatDigit(time.hours);
  const minutes = formatDigit(time.minutes);
  const seconds = formatDigit(time.seconds);

  if (options.hideHours) {
    return `${minutes}:${seconds}`;
  }
  if (options.hideSeconds) {
    return `${hours}:${minutes}`;
  }
  return `${hours}:${minutes}:${seconds}`;
};

export const getTimePassed = (d1, d2 = Date.now()) => {
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  if (!d1) {
    return { hours, minutes, seconds };
  }
  const start = moment(d1);
  const end = moment(d2);

  const difference = end.diff(start);
  const duration = moment.duration(difference);
  const result = Math.floor(duration.asHours()) + moment.utc(difference).format(":mm:ss");
  const splitResult = result.split(':');
  return {
    hours: parseInt(splitResult[0]),
    minutes: parseInt(splitResult[1]),
    seconds: parseInt(splitResult[2]),
  }
}

export const humanFriendlyDate = (date) => {
  if (isToday(date)) {
    return 'Today';
  }
  if (isYesterday(date)) {
    return 'Yesterday'
  }

  const FORMAT = 'ddd - DD MMM';
  return moment(date).format(FORMAT);
}

export const isValidTimeString = (timeString = '') => {
  const timeRegex =  /^\d+$/;
  const cleanTimeString = timeString.replace(/:/g, '');
  return timeRegex.test(cleanTimeString);
}

export const getTimeDiff = (time1, time2, options = {}) => {
  const { format = 'HH:mm:ss' } = options;
  const t1 = moment(time1, format);
  const t2 = moment(time2, format);
  return t1.diff(t2);
}
