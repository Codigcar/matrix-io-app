import React from 'react';
import { render } from '@testing-library/react-native';
import { Pagination } from 'react-native-snap-carousel';
import Paginator from '../../components/Paginator';

jest.mock('react-native-snap-carousel', () => ({
  Pagination: jest.fn(() => null),
}));

describe('Paginator', () => {
  it('renders without crashing', () => {
    // Datos de ejemplo
    const data = [
      { id: '1', type: 'type1', text: 'Text 1' },
      { id: '2', type: 'type2', text: 'Text 2' },
    ];
    const currentPage = 0;

    render(<Paginator data={data} currentPage={currentPage} />);

    expect(Pagination).toHaveBeenCalledWith(
      {
        activeDotIndex: 0,
        containerStyle: undefined,
        dotStyle: undefined,
        dotsLength: 2,
        inactiveDotOpacity: 1,
        inactiveDotScale: 1,
        inactiveDotStyle: undefined,
      },
      {},
    );
  });
});
