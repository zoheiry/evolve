import moment from "moment";

const formatDigit = digit => {
  if (!digit) {
    return "00";
  }
  return digit > 9 ? digit : `0${digit}`;
};

const isToday = date => {
  const today = moment();
  return moment(date).isSame(today, "day");
};

const isYesterday = date => {
  const yesterday = moment().subtract(1, "day");
  return moment(date).isSame(yesterday, "day");
};

export const formatTime = (time = {}, options = {}) => {
  const hours = formatDigit(time.hours);
  const minutes = formatDigit(time.minutes);
  const seconds = formatDigit(time.seconds);
  let units = ["h", "m", "s"];
  let values = [hours, minutes, seconds];

  if (options.hideHours) {
    units = ["m", "s"];
    values = [minutes, seconds];
  }
  if (options.hideSeconds) {
    units = ["h", "m"];
    values = [hours, minutes];
  }
  if (options.displayUnits) {
    return values.map((val, i) => val + units[i]).join(" ");
  }

  return values.join(":");
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
  const result =
    Math.floor(duration.asHours()) + moment.utc(difference).format(":mm:ss");
  const splitResult = result.split(":");
  return {
    hours: parseInt(splitResult[0]),
    minutes: parseInt(splitResult[1]),
    seconds: parseInt(splitResult[2])
  };
};

export const humanFriendlyDate = date => {
  if (isToday(date)) {
    return "Today";
  }
  if (isYesterday(date)) {
    return "Yesterday";
  }

  const FORMAT = "ddd - DD MMM";
  return moment(date).format(FORMAT);
};

export const isValidTimeString = (timeString = "") => {
  if (!timeString) {
    return false;
  }
  const timeRegex = /^\d+$/;
  const cleanTimeString = timeString.replace(/:/g, "");
  return timeRegex.test(cleanTimeString);
};

export const getTimeDiff = (time1, time2, options = {}) => {
  const { format = "HH:mm:ss" } = options;
  const t1 = moment(time1, format);
  const t2 = moment(time2, format);
  return t1.diff(t2);
};

export const getTotalSessionsDuration = (
  sessions = [],
  activeSession = {},
  emptyState = '-- --'
) => {
  if (!sessions.length && !activeSession.start) {
    return emptyState;
  }
  let totalHours = 0;
  sessions.forEach(session => {
    const startDate = moment(session.start);
    const endDate = moment(session.end);
    const hours = endDate.diff(startDate, "hours", true);
    totalHours += hours;
  });
  if (activeSession && activeSession.start) {
    totalHours += moment(Date.now()).diff(
      moment(activeSession.start),
      "hours",
      true
    );
  }
  const hours = Math.floor(totalHours);
  const minutes = Math.floor((totalHours - hours) * 60);
  return formatTime(
    { hours, minutes },
    { hideSeconds: true, displayUnits: true }
  );
};
