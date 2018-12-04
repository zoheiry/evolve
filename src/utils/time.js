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
  return `${hours}:${minutes}:${seconds}`;
};


export default formatTime;
