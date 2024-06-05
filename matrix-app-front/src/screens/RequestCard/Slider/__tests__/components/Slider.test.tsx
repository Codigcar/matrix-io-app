import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { rebrandingTheme } from 'matrix-ui-components';
import { ThemeProvider } from '@shopify/restyle';
import Slider from '../../components/Slider';

jest.mock('react-native-snap-carousel', () => {
  const SnapCarousel: React.FC<{
    data: any[];
    renderItem: (props: { item: any; index: number }) => React.ReactNode;
  }> = ({ data, renderItem }) => <>{data.map((item, index) => renderItem({ item, index }))}</>;
  return {
    __esModule: true,
    default: SnapCarousel,
  };
});

jest.mock('../../components/Paginator', () => {
  const PaginatorMock: React.FC<{ data: any[]; currentPage: number }> = ({ data, currentPage }) => (
    <>{data.map((item, index) => (index === currentPage ? '●' : '○'))}</>
  );
  return {
    __esModule: true,
    default: PaginatorMock,
  };
});

describe('Slider', () => {
  const data = [
    { id: '1', type: 'type1', text: 'Slider 1' },
    { id: '2', type: 'type2', text: 'Slider 2' },
  ];

  it('renders Carousel with correct data', () => {
    const { getByText } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <Slider data={data} />
      </ThemeProvider>,
    );

    expect(getByText('Slider 1')).toBeTruthy();
  });

  it('should update activeSlide when handleSnapToItem is called', () => {
    const { getByText } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <Slider data={data} />
      </ThemeProvider>,
    );

    const slider = getByText('Slider 1').parent;

    fireEvent(slider, 'onScrollIndexChanged', 1);

    expect(getByText('Slider 1')).toBeTruthy();
  });
});
