import { NavigationPropsType } from 'src/types/types';

const useGetPlans = (props: NavigationPropsType) => {
  const { navigation } = props;
  const plans = [
    {
      id: 1,
      plan: 'Basico',
      price: 'Gratis',
      period: 'Sin costo',
      benefits: [
        {
          name: 'Cashback',
          description: '1% en todas tus compras.',
        },

        {
          name: 'Cashback',
          description: '2% en categorias de tu elección.',
        },

        {
          name: 'Descuentos',
          description: 'Hasta 15% en establecimientos.',
        },

        {
          name: 'Descuentos personalizados',
          description: '15% establecimientos recurrentes.',
        },
      ],
    },
  ];
  const onPressContinue = () => {
    navigation.navigate('Login');
  };

  const onPressBackArrow = () => {
    navigation.navigate('Login');
  };

  return {
    onPressContinue,
    onPressBackArrow,
    plans,
  };
};

export default useGetPlans;
