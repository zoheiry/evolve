import moment from 'moment';

const formatDigit = (digit) => {
  if (!digit) {
    return '00';
  }
  return digit > 9 ? digit : `0${digit}`;
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

export const getTimePassed = (date) => {
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  if (!date) {
    return { hours, minutes, seconds };
  }
  const start = moment(date);
  const now = moment(Date.now());

  var difference = now.diff(start);
  var duration = moment.duration(difference);
  var result = Math.floor(duration.asHours()) + moment.utc(difference).format(":mm:ss");
  const splitResult = result.split(':');
  return {
    hours: parseInt(splitResult[0]),
    minutes: parseInt(splitResult[1]),
    seconds: parseInt(splitResult[2]),
  }
}
