import moment from 'moment';
import * as RNLocalize from 'react-native-localize';
import { CURRENCY } from './constants';
import type { ICurrencySymbol } from './types';
import { AuthErrorCodeEnum } from './enum/error-type.enum';

export const RESET_REDUCER = 'RESET_REDUCER';

interface formatCurrencyParams {
  removeDecimalsWhenRounded?: boolean;
  showPlusSign?: boolean;
  currencySymbol?: ICurrencySymbol;
}

const Helpers = {
  formatTime: (value: number): string => ` 00:0${value}`,
  formatCurrency: (
    value: number,
    { removeDecimalsWhenRounded, showPlusSign, currencySymbol = 'S/' }: formatCurrencyParams = {},
  ): string => {
    if (Number.isNaN(Number(value))) {
      return String(value);
    }
    const moneySymbolText = currencySymbol === CURRENCY.USD.symbol ? currencySymbol.concat(' ') : currencySymbol;
    if (value === 0) return `${moneySymbolText}0.00`;
    let sign = '';

    if (value < 0) {
      sign = '-';
    }

    if (value > 0 && showPlusSign) {
      sign = '+';
    }

    let removeDecimals = false;
    if (removeDecimalsWhenRounded) {
      removeDecimals = value % 1 === 0;
    }
    const formatOptions = removeDecimalsWhenRounded && removeDecimals ? {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    } : {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    };
    return `${sign}${moneySymbolText}${(Math.abs(value)).toLocaleString('es-PE', formatOptions)}`;
  },
  formatStringCamel: (name: string): string => {
    const nameList = name.split(' ');
    return `${nameList.reduce(
      (prev, curr) => `${prev + curr.split(' ')[0].charAt(0).toUpperCase() + curr.slice(1).toLowerCase()} `,
      '',
    )}`;
  },
  formatMoney: (
    numberValue: number | string = '0',
    moneySymbol = 'S/',
    isTextInput = false,
  ): string => {
    let returnValue = `${moneySymbol}${numberValue}`;
    if (isTextInput) {
      const regInput = /[GBP]+\s|[GBP]|[£]|[£ ]/g;
      returnValue = new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'GBP',
      }).format(+numberValue);
      returnValue = `${moneySymbol}${returnValue.replace(regInput, '')}`;
    } else if (+numberValue > 0) {
      returnValue = new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'GBP',
      }).format(+numberValue);
      const reg = /[GBP]+\s|[GBP]|[£]|[£ ]|.00$/g;
      returnValue = `${moneySymbol}${returnValue.replace(reg, '')}`;
    }

    return returnValue;
  },
  limitString: (value: string, limit: number = 70): string => {
    if (value.length > limit) {
      return `${value.substring(0, limit)}... Ver más`;
    }
    return value;
  },
  limitStartString: (value: string, limit: number): string => {
    if (value.length <= limit) {
      return value;
    }
    return `...${value.substring(value.length - limit)}`;
  },
  limitAccountNumberString: (value: string, limit: number): string => {
    if (value.length <= limit) {
      return value;
    }
    return `${value.substring(value.length - limit)}`;
  },
  formatAmount: (value: number | string) => String(value).replace('-', ''),
  capitalizeWord: (text: string) => text
    .toLocaleLowerCase()
    .trim()
    .split(/\s+/)
    .map((element) => element.charAt(0).toUpperCase() + element.slice(1).toLowerCase())
    .join(' '),
  separateNameInTwoLines: (text: string) => text
    .toLocaleLowerCase()
    .trim()
    .split(/\s+/)
    .map((element) => element.charAt(0).toUpperCase() + element.slice(1).toLowerCase())
    .join('\n'),
  formatQueryParams: (query: string) => query.replace(/ /g, '%20'),
  formatDefaultTime: (time: string) => {
    const timeFormat = 'HH:mm';
    const formattedTime = moment(time, timeFormat);
    if (formattedTime.isValid()) {
      return formattedTime.format('hh:mm a');
    }
    return '-';
  },
  diffDatesInSeconds: (actualDate: Date, previousDate: Date): number => {
    const diffMilliseconds = actualDate.getTime() - previousDate.getTime();
    const diffSeconds = diffMilliseconds / 1000;
    return Math.round(diffSeconds);
  },
  getLocale: () => {
    const locales = RNLocalize.getLocales();
    if (locales.length > 0) {
      return locales[0].languageCode.toLowerCase();
    }
    return 'es';
  },
  formatPhone: (phoneNumber: string) => phoneNumber.match(/.{1,3}/g).join(' '),
  getErrorCode: (value: string, enumerationFirst: object, enumerationSecond: object) => {
    const errorCode = !Object.values(enumerationFirst).includes(value as any)
      && !Object.values(enumerationSecond).includes(value as any)
      ? AuthErrorCodeEnum.UNEXPECTED_ERROR
      : value;

    return errorCode;
  },
  formatTimeString: (inputString: string): string => {
    const timeRegex = /(\d{1,2}:\d{2}\s?[ap]\.m\.)\s*a\s*(\d{1,2}:\d{2}\s?[ap]\.m\.)/i;
    const match = inputString.match(timeRegex);
    if (!match) return inputString;
    const startTime = match[1];
    const endTime = match[2];

    const formattedEndTime = endTime === '1:00 p.m.'
      ? 'la 1:00 p.m.'
      : `las ${endTime}`;

    const formattedString = inputString.replace(timeRegex, `${startTime} hasta ${formattedEndTime}`);
    return formattedString;
  },

};

export default Helpers;
