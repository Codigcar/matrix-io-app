export const RegexPassword = /^(?=.*[ÑA-Z])(?=.*[ña-z])(?=.*\d)(?=.*[\^$* .[\]{}()?"!@#%&/\\,><':;|_~`=+-])[ÑA-Zña-z\d^$* .[\]{}()?"!@#%&/\\,><':;|_~`=+-]{8,}$/;

export const RegexReplacePassword = /[^0-9a-zA-Z!ñÑ"#$%&'()*+,-./:;<=>?@[\]^_{|}~`]/g;

export const RegexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export const RegexReplaceEmail = /[^0-9a-zA-Z@._-]/g;

export const RegexReplaceDni = /[^0-9]/g;

export const RegexPhoneNumber = /[^0-9 ]/g;

export const RegexReplaceNumber = /[^0-9]/g;

export const RegexOnlyText = /^[a-zA-Z ]+$/g;

export const RegexReplaceCardActivationCode = /[^0-9]/g;

export const RegexAddress =
  /^[a-zA-Z0-9]+[\s]*[a-zA-Z0-9.\-\,\#]+[\s]*[a-zA-Z0-9.\-\,\#]+[a-zA-Z0-9\s.\-\,\#]*$/;

export const RegexAddressDelivery = /^([a-zA-ZñÑ0-9,:';.#\-_áÁéÉíÍóÓúÚüÜ]|\s+[a-zA-ZñÑ0-9,:';.#\-_áÁéÉíÍóÓúÚüÜ])*$/;
export const RegexReferenceDelivery = /^([a-zA-ZñÑ0-9,:';.#\-_áÁéÉíÍóÓúÚüÜ]|\s+[a-zA-ZñÑ0-9,:';.#\-_áÁéÉíÍóÓúÚüÜ])*$/;

export const RegexPhoneNumberPeru = /^(9[0-9]{2}\s[0-9]{3}\s[0-9]{3})$/;

export const RegexCardActivationCode = /^([0-9]{5}\s[0-9]{5}\s[0-9]{2,5})$/;

export const LINE_BREAK = /^([0-9]{5}\s[0-9]{5}\s[0-9]{2,5})$/;

export const RegexGetHexValues = /[0-9a-fA-F]{32,}/g;

export const RegexNumberAndLetters = /[a-zA-Z0-9]+/;

export const RegexAppVersion = /^(\d+\.\d+\.\d+)/;

export default { RegexPassword, RegexEmail };
