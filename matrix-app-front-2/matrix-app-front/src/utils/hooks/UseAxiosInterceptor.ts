import { useEffect } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import CheckNetworkConnection from './UseCheckNetworkConnection';
import navigationScreenNames from '../navigationScreenNames';

const UseAxiosInterceptor = ({ children }: any) => {
  const { navigate } = useNavigation<any>();
  const IsNetworkConnected = CheckNetworkConnection();

  useEffect(() => {
    const resInterceptor = (response: any) => {
      if (!IsNetworkConnected) {
        navigate(navigationScreenNames.networkError);
        return true;
      }
      return response;
    };

    const errInterceptor = (error: any) => {
      if (!IsNetworkConnected) {
        navigate(navigationScreenNames.networkError);
        return true;
      }
      return Promise.reject(error);
    };

    const interceptor = axios.interceptors.request.use(resInterceptor, errInterceptor);

    return () => axios.interceptors.request.eject(interceptor);
  }, [IsNetworkConnected, navigate]);
  return children;
};

export default UseAxiosInterceptor;
