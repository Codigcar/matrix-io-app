import moment, { MomentInput } from 'moment-timezone';

export default function MomentInit() {
  moment.locale('es', {
    months: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ],
    monthsShort: [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic',
    ],
    weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
    weekdaysMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
  });
  moment.updateLocale('es', {
    meridiem(hour, minute, isLowercase) {
      if (hour >= 12) return isLowercase ? 'p.m' : 'PM';
      return isLowercase ? 'a.m' : 'AM';
    },
  });
}

export const formatDate = (
  date: MomentInput,
  format: string = 'dddd DD [de] MMMM [del] YYYY',
  currentDateFormat?: string,
) => {
  if (currentDateFormat) {
    return moment(date, currentDateFormat).locale('es').format(format);
  }
  return moment(date).locale('es').format(format);
};

export const currentDate = () => moment();
export const dateParse = (date: string) => moment(date);
export const compareActualDate = (date: MomentInput) => {
  const compareAgainst = moment(date);
  return currentDate() < compareAgainst;
};

export const formatDateToPicker = (date) => moment(date).toDate();
export const getNextDate = (days) => moment().add(days, 'days').startOf('day').toDate();
export const getDate = (days, currentDate) => moment(currentDate).add(days, 'days').startOf('day').toDate();
