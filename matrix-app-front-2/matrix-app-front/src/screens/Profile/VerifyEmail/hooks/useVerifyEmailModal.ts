import { useSelector } from 'react-redux';
import { maskData } from 'src/utils/obfuscated/ObfuscatedDataProfile';

const emailSelector = (state: any) => state.session.user?.email;

const useVerifyEmailModal = () => {
  const email = useSelector(emailSelector);
  const emailMasked = maskData(email, 'email');
  return { emailMasked };
};

export default useVerifyEmailModal;
