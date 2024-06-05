import { PHONE_NUMBER_LENGHT } from './constants';
import { RegexNumberAndLetters } from './regex/InputValidator';

const maskPhoneText = (value: string) =>
  value
    .replace(/ /g, '')
    .slice(0, PHONE_NUMBER_LENGHT)
    .split('')
    .map((char, index) => ((index === 2 || index === 5) ? `${char} ` : char))
    .join('')
    .trim();

const getNumbersLetters = (value: string) => {
  const result = value.match(RegexNumberAndLetters);
  return result ? result.join('') : '';
};

export { maskPhoneText, getNumbersLetters };
