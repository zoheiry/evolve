import { isEmpty } from 'lodash';
import moment from 'moment';
import { isValidTimeString } from './time';

const TIME_FORMAT = 'HH:mm:ss';

export const isValidTimeSlot = (timeSlot) =>
  timeSlot && isValidTimeString(timeSlot.startTime) && isValidTimeString(timeSlot.endTime);

export const getNextTimeSlot = (schedule) => {
  if (isEmpty(schedule)) {
    return null;
  }

  const now = moment();
  const today = now.format('dddd').toLowerCase();
  const timeSlotToday = schedule[today];
  if (isValidTimeSlot(timeSlotToday)) {
    const hasTimeSlotPassed = moment(now, TIME_FORMAT).isAfter(moment(timeSlotToday.startTime, TIME_FORMAT));
    if (!hasTimeSlotPassed) {
      return {
        day: today,
        startTime: timeSlotToday.startTime,
        endTime: timeSlotToday.endTime,
      };
    }
  }

  const upcomingWeekDays = Array(6)
    .fill()
    .map((_, i) => moment().add(i + 1, 'days').format('dddd').toLowerCase());
  const nextDay = upcomingWeekDays.find((day) => isValidTimeSlot(schedule[day]));
  if (nextDay) {
    return {
      day: nextDay,
      startTime: schedule[nextDay].startTime,
      endTime: schedule[nextDay].endTime,
    };
  }

  return null;
}
