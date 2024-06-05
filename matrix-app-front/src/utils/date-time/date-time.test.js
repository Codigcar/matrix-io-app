import moment from 'moment-timezone';
import { formatDate } from './date-time';

const localeDefault = 'es';
const timeZone = 'America/Lima';
const dateStr = '2022-09-05T20:34:00';
let now;
beforeEach(() => {
  moment.updateLocale(localeDefault, {
    meridiem(hour, minute, isLowercase) {
      if (hour >= 12) return isLowercase ? 'p.m.' : 'P.M.';
      return isLowercase ? 'a.m.' : 'A.M.';
    },
  });
  moment.tz.setDefault('GMT-5');
  now = moment(dateStr);
});
test('test for date format function', () => {
  expect(formatDate(now.tz(timeZone))).toEqual('lunes 05 de septiembre del 2022');
});
test('test for time format function', () => {
  expect(now.format('h:mm a')).toEqual('8:34 p.m.');
});
