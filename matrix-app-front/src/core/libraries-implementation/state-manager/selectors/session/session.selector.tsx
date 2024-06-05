import { useSelector } from 'react-redux';

export const useUserSelectors = () => {
  const accountId = useSelector((state: RootState) => state.session?.user?.accountId);
  const email = useSelector((state: RootState) => state.session?.user?.email);

  return {
    accountId,
    email,
  };
};
