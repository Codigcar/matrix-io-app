import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import Slider from 'src/matrix-ui-components/components/slider'; // Asegúrate de que la ruta del import sea correcta
import BenefitItem from 'src/matrix-ui-components/components/slider/BenefitItem';
import { render } from 'src/matrix-ui-components/utils/test-utils';

jest.mock('react-native-snap-carousel', () => 'Carousel');
jest.mock('react-native-linear-gradient', () => 'LinearGradient');

jest.mock('src/screens/Welcome/Slider/components/Paginator', () => 'Paginator');
jest.mock('src/matrix-ui-components/components/slider/BenefitItem.tsx', () => (props) => (
  <mock-ItemSlider {...props} />
));

describe('Slider component', () => {
  const listTwoItems = [
    {
      benefit: '30% dscto',
      benefitValue: 30,
      category: 'Market',
      id: '10ade591-9042-4f02-8e45-2bfeed6f7917',
      imgPath: 'BENEFIT/FRESHMART/PREVIEW.png',
      offerTitle: 'En toda la web',
      partnerName: 'Freshmart',
    },
    {
      benefit: '20% dscto',
      benefitValue: 20,
      category: 'Market',
      id: '09c53d88-27e2-4d2b-affc-eb028ce7d28f',
      imgPath: 'BENEFIT/USAMS/PREVIEW.png',
      offerTitle: 'En toda la tienda',
      partnerName: 'USAMS',
    },
  ];
  const listItems = [
    {
      benefit: '30% dscto',
      benefitValue: 30,
      category: 'Market',
      id: '10ade591-9042-4f02-8e45-2bfeed6f7917',
      imgPath: 'BENEFIT/FRESHMART/PREVIEW.png',
      offerTitle: 'En toda la web',
      partnerName: 'Freshmart',
    },
    {
      benefit: '20% dscto',
      benefitValue: 20,
      category: 'Market',
      id: '09c53d88-27e2-4d2b-affc-eb028ce7d28f',
      imgPath: 'BENEFIT/USAMS/PREVIEW.png',
      offerTitle: 'En toda la tienda',
      partnerName: 'USAMS',
    },
    {
      benefit: '20% dscto. Adicional',
      benefitValue: 20,
      category: 'Market',
      id: 'd10aa7c0-9364-4d19-874c-0ea42a6457b0',
      imgPath: 'BENEFIT/TIENDA UTIL/PREVIEW.png',
      offerTitle: 'En toda la web',
      partnerName: 'Tienda UTIL',
    },
    {
      benefit: '20% dscto. Adicional',
      benefitValue: 20,
      category: 'Market',
      id: 'd10aa7c0-9364-4d19-874c-0ea42a6457b0',
      imgPath: 'BENEFIT/TIENDA UTIL/PREVIEW.png',
      offerTitle: 'En toda la web',
      partnerName: 'Tienda UTIL',
    },
    {
      benefit: '20% dscto. Adicional',
      benefitValue: 20,
      category: 'Market',
      id: 'd10aa7c0-9364-4d19-874c-0ea42a6457b0',
      imgPath: 'BENEFIT/TIENDA UTIL/PREVIEW.png',
      offerTitle: 'En toda la web',
      partnerName: 'Tienda UTIL',
    },
    {
      benefit: '20% dscto. Adicional',
      benefitValue: 20,
      category: 'Market',
      id: 'd10aa7c0-9364-4d19-874c-0ea42a6457b0',
      imgPath: 'BENEFIT/TIENDA UTIL/PREVIEW.png',
      offerTitle: 'En toda la web',
      partnerName: 'Tienda UTIL',
    },
    {
      benefit: '20% dscto. Adicional',
      benefitValue: 20,
      category: 'Market',
      id: 'd10aa7c0-9364-4d19-874c-0ea42a6457b0',
      imgPath: 'BENEFIT/TIENDA UTIL/PREVIEW.png',
      offerTitle: 'En toda la web',
      partnerName: 'Tienda UTIL',
    },
  ];

  const widthItemCustom = 300;

  it('renders correctly', () => {
    const onClickItemMock = jest.fn();
    const { getByTestId } = render(
      <Slider
        listItems={listItems}
        widthItemCustom={widthItemCustom}
        ItemSlider={BenefitItem}
        onClickItem={onClickItemMock}
      />,
    );
    expect(getByTestId('carousel')).toBeTruthy();
    expect(getByTestId('paginator')).toBeTruthy();
  });

  it('changes the active slide on carousel snap', () => {
    const onClickItemMock = jest.fn();
    const { getByTestId } = render(
      <Slider
        listItems={listItems}
        widthItemCustom={widthItemCustom}
        ItemSlider={BenefitItem}
        onClickItem={onClickItemMock}
      />,
    );
    const carousel = getByTestId('carousel');
    fireEvent(carousel, 'onSnapToItem', 1);
    expect(getByTestId('paginator')).toHaveProp('currentPage', 1);
  });

  it('renders Paginator when there are items', () => {
    const { queryByTestId } = render(<Slider listItems={listTwoItems} />);
    const paginator = queryByTestId('paginator');
    expect(paginator).not.toBeNull();
  });

  it('does not render Paginator when there are no items', () => {
    const { queryByTestId } = render(<Slider listItems={[]} />);
    const paginator = queryByTestId('paginator');
    expect(paginator).toBeNull();
  });

  it('renders each item correctly', () => {
    const onClickItemMock = jest.fn();
    const { getByTestId } = render(
      <Slider
        listItems={listItems}
        widthItemCustom={widthItemCustom}
        ItemSlider={BenefitItem}
        onClickItem={onClickItemMock}
      />,
    );
    const carousel = getByTestId('carousel');

    const renderItem = carousel.props.renderItem({ item: listItems[0], index: 0 });
    const { getByTestId: getItemByTestId } = render(renderItem);
    expect(getItemByTestId('item-slider')).toBeTruthy();
  });
});
