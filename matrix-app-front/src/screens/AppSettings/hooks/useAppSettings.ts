import { useEffect, useState } from 'react';
import { NavigationPropsType } from 'src/types/types';

const useAppSettings = (props: NavigationPropsType) => {
  const { navigation } = props;

  const onBackPress = () => {
    navigation.goBack();
  };
  return {
    onBackPress,
  };
};

export default useAppSettings;
