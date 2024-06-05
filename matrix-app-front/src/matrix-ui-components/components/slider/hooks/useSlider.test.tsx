import { renderHook, act } from '@testing-library/react-hooks';
import { screenWidth } from 'src/utils/constants';
import EStyleSheet from 'react-native-extended-stylesheet';
import useSlider from './useSlider';

const dotWidth = EStyleSheet.value('29rem');
const marginWidth = EStyleSheet.value('4rem');

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
];

describe('useSlider hook', () => {
  it('initializes with default values', () => {
    const { result } = renderHook(() => useSlider(listItems));
    expect(result.current.activeSlide).toBe(0);
    expect(result.current.scrollEnabled).toBe(true);
  });

  it('sets active slide correctly', () => {
    const { result } = renderHook(() => useSlider(listItems));
    act(() => {
      result.current.setActiveSlide(2);
    });
    expect(result.current.activeSlide).toBe(2);
  });

  it('handles scroll index change correctly when index is activeSlide - 1', () => {
    jest.mock('src/utils/constants', () => ({
      ...jest.requireActual('src/utils/constants'),
      ios: true,
    }));
    const { result } = renderHook(() => useSlider(listItems));
    act(() => {
      result.current.activeSlide = 2;
      result.current.handlerOnScrollIndexChanged(1);
    });
    expect(result.current.activeSlide).toBe(1);
  });

  it('startMovingLeft updates leftPosition correctly', () => {
    const { result } = renderHook(() => useSlider(listItems));
    act(() => {
      result.current.startMovingLeft(100);
    });
    expect(result.current.leftPosition.value).toBeCloseTo(-687);
  });

  it('useEffect sets up initial leftPosition based on listItems length', () => {
    const longListItems = new Array(4).fill(null);
    const { result: longListResult } = renderHook(() => useSlider(longListItems));
    expect(longListResult.current.leftPosition.value).toBe(-687);
    const shortListItems = new Array(2).fill(null);
    const { result: shortListResult } = renderHook(() => useSlider(shortListItems));
    expect(shortListResult.current.leftPosition.value).toBe(-687);
  });

  it('updates positionCheck and leftPosition when activeSlide changes', () => {
    const { result } = renderHook(() => useSlider(listItems));
    act(() => {
      result.current.setActiveSlide(2);
    });
    expect(result.current.positionCheck.value).toBe(2);
    expect(result.current.leftPosition.value).toBe(-687);
  });

  it('handles first render correctly', () => {
    const { result } = renderHook(() => useSlider(listItems));
    expect(result.current.isFirstRender.current).toBe(false);
  });

  it('does nothing when lengthItems is 3 or less', () => {
    const shortListItems = new Array(3).fill(null);
    const { result } = renderHook(() => useSlider(shortListItems));
    expect(result.current.positionCheck.position).toBe(0);
    expect(result.current.leftPosition.value).toBe(
      screenWidth / 2 - (dotWidth + marginWidth + 3) * 2,
    );
  });
});
