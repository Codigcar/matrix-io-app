import React from 'react';
import {DataContext} from '../../src/context';
import MainScreen from '../../src/screen/MainScreen';

const {render} = require('@testing-library/react-native');
describe('testing en <CRenderItem />', () => {
  it('debe hacer match con el snapshot', () => {
    const component = render(<MainScreen />);
    expect(component).toMatchSnapshot();
  });

  it('debe mostrar el loading inicial', () => {
    const {getByText} = render(<MainScreen />);
    const textLoading = 'Cargando...';
    expect(getByText(textLoading)).toBeTruthy();
  });

  it('debe renderizar la lista de publicaciones obtenidas', () => {
    const publicationsList = [
      {
        userId: 1,
        id: 1,
        title: 'title1',
        body: 'body1',
      },
      {
        userId: 1,
        id: 2,
        title: 'title2',
        body: 'body2',
      },
      {
        userId: 1,
        id: 3,
        title: 'title3',
        body: 'body3',
      },
    ];
    const getNextPublication = jest.fn();
    const resetData = jest.fn();
    const initData = jest.fn();
    const getStorage = jest.fn();
    const setStorage = jest.fn();
    const removeStorage = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    const {getByText} = render(
      <DataContext.Provider
        value={{
          publications: publicationsList,
          getNextPublication,
          resetData,
          initData,
          getStorage,
          setStorage,
          removeStorage,
        }}>
        <MainScreen />
      </DataContext.Provider>,
    );
    expect(getByText(publicationsList[0].title)).toBeTruthy();
  });
});
