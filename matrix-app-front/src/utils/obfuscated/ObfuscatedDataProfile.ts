export const formatDNI = (document: string) => (document?.length === 8
  ? `${document.slice(0, 2)}****${document.slice(-2)}`
  : '');

export const maskData = (value: string, type: string, charsAroundAt: number = 1): string => {
  const strArray = value.split('');
  const lastItemIndex = strArray.length - 1;
  if (type === 'email') {
    let hasPassDot = false;
    let hasPassAt = false;
    return strArray
      .map((char, index) => {
        if (index <= charsAroundAt - 1 || index === lastItemIndex) return char;
        if (
          char === '@' || Array.from({ length: charsAroundAt }, (_, i) => strArray[index - i - 1] === '@').some(Boolean)
        ) {
          hasPassAt = true;
          return char;
        }
        if (char === '.' && (index === lastItemIndex - 3 || index === lastItemIndex - 2) && hasPassAt) {
          hasPassDot = true;
          return char;
        }
        if (hasPassDot && hasPassAt) return char;
        return '*';
      })
      .join('');
  }
  if (type === 'phone') {
    return strArray
      .map((char, index) => {
        if (index <= 1 || index >= lastItemIndex - 1) return char;
        if ((index + 1) % 3 === 0) {
          if (index === 2) return `${char} `;
          return '* ';
        }
        return '*';
      })
      .join('');
  }

  if (type === 'address') {
    if (value.length <= 10) return value;
    const firstCharacters = value.substring(0, 4);
    const lastCharacters = value.substring(value.length - 3);
    const asterisks = '*'.repeat(8);
    return `${firstCharacters} ${asterisks}${lastCharacters}`;
  }
  return '';
};

export default { formatDNI, maskData };
