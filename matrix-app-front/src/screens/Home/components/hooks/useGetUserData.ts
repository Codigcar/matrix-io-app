import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { formatUserFullName } from 'src/utils/string';

const userDataSelector = (state: any) => state.session.user;

const useGetUserData = () => {
  const userData = useSelector(userDataSelector);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 5000);
  }, []);

  const userName = formatUserFullName(userData.name, userData.lastName);

  return { userName, isLoading };
};

export default useGetUserData;
