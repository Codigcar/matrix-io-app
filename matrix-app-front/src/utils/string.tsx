import Helpers from 'src/utils/Helpers';

export const textLengthAccording = (text: string, length: number, ending = '...'): string => (
  text.length < length
    ? `${text}`
    : `${text.substring(0, (length - 1))}${ending ?? '...'}`);

export const capitalize = (text:string) => (
  text
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
);

export const formatUserFullName = (firstName: string, lastName: string) => {
  const firstCapitalName = firstName ? Helpers.capitalizeWord(firstName.split(' ')[0]) : '';
  let firstLastName = '';
  if (lastName) {
    const lastNameAux = lastName.split(' ');
    lastNameAux.pop();
    firstLastName = Helpers.capitalizeWord(lastNameAux.join(' '));
  }
  return `${firstCapitalName} \n${firstLastName}`;
};

export default { textLengthAccording, capitalize, formatUserFullName };
