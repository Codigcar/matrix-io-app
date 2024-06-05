import React from 'react';
import {CRenderList} from '../../src/components/CRenderList';

const {render, fireEvent, act} = require('@testing-library/react-native');
describe('testing en <CRenderList />', () => {
  const publicationsListMock = [
    {
      userId: 1,
      id: 1,
      title: 'title',
      body: 'body',
    },
    {
      userId: 1,
      id: 2,
      title: 'title',
      body: 'body',
    },
    {
      userId: 1,
      id: 3,
      title: 'title',
      body: 'body',
    },
  ];

  const pullRefreshMock = jest.fn();
  const loadMoreMock = jest.fn();

  const isLoadingPullRefreshMock = false;
  const timeEndReachedMock = 0.2;

  beforeEach(() => jest.clearAllMocks());

  it('debe hacer match con el snapshot', () => {
    const component = render(
      <CRenderList
        data={publicationsListMock}
        pullRefresh={pullRefreshMock}
        isLoadingPullRefresh={isLoadingPullRefreshMock}
        loadMore={loadMoreMock}
        timeEndReached={timeEndReachedMock}
      />,
    );
    expect(component).toMatchSnapshot();
  });

  it('debe renderizar la lista de publicaciones', async () => {
    const {queryAllByRole} = render(
      <CRenderList
        data={publicationsListMock}
        pullRefresh={pullRefreshMock}
        isLoadingPullRefresh={isLoadingPullRefreshMock}
        loadMore={loadMoreMock}
        timeEndReached={timeEndReachedMock}
      />,
    );

    expect(queryAllByRole('menuitem').length).toBe(publicationsListMock.length);
  });

  it('debe mostrar un mensaje cuando cuando no encuentra resultado', () => {
    const {getByText} = render(
      <CRenderList
        data={[]}
        pullRefresh={pullRefreshMock}
        isLoadingPullRefresh={isLoadingPullRefreshMock}
        loadMore={loadMoreMock}
        timeEndReached={timeEndReachedMock}
      />,
    );

    const message = 'Publicaciones no encontradas';
    expect(getByText(message)).toBeTruthy();
  });

  it('debe ejecutar la funcion loadMoreMock al realizar un scroll para obtener el listado de publicaciones del siguiente usuario', async () => {
    const {getByTestId} = render(
      <CRenderList
        data={publicationsListMock}
        pullRefresh={pullRefreshMock}
        isLoadingPullRefresh={isLoadingPullRefreshMock}
        loadMore={loadMoreMock}
        timeEndReached={timeEndReachedMock}
      />,
    );

    const flatListComponent = getByTestId('flat-list');

    const eventData = {
      nativeEvent: {
        contentOffset: {
          y: 500,
        },
        contentSize: {
          height: 500,
          width: 100,
        },
        layoutMeasurement: {
          height: 100,
          width: 100,
        },
      },
    };

    fireEvent.scroll(flatListComponent, eventData);
    expect(loadMoreMock).toHaveBeenCalled();
  });

  it('debe ejecutar la funcion pullRefreshMock al realizar un dropdown', async () => {
    const {getByTestId} = render(
      <CRenderList
        data={publicationsListMock}
        pullRefresh={pullRefreshMock}
        isLoadingPullRefresh={isLoadingPullRefreshMock}
        loadMore={loadMoreMock}
        timeEndReached={timeEndReachedMock}
      />,
    );

    const flatListComponent = getByTestId('flat-list');
    expect(flatListComponent).toBeDefined();

    const {refreshControl} = flatListComponent.props;
    await act(async () => {
      refreshControl.props.onRefresh();
    });
    expect(pullRefreshMock).toHaveBeenCalled();
  });
});
