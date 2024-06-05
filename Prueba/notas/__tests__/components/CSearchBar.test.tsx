import React, {useState} from 'react';
import {CSearchBar} from '../../src/components/CSearchBar';

const {render, fireEvent, screen} = require('@testing-library/react-native');
describe('testing en <CSearchBar />', () => {
  const publicationsList = [
    {
      userId: 1,
      id: 1,
      title: 'title1',
      body: 'body1'
    },
    {
      userId: 1,
      id: 2,
      title: 'title2',
      body: 'body2'
    },
    {
      userId: 1,
      id: 3,
      title: 'title3',
      body: 'body3'
    },
  ];

  const searchText = '';
  const setSearchMock = jest.fn();
  const setFilteredDataSourceMock = jest.fn();

  beforeEach(() => jest.clearAllMocks());
  it('debe hacer match con el snapshot', () => {
    const container = render(
      <CSearchBar
        dataList={publicationsList}
        search={searchText}
        setSearch={setSearchMock}
        setFilteredDataSource={setFilteredDataSourceMock}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('debe ejecutarse las funcion setSearch con nuevo texto ingresado', () => {
    const changeTextTo = 'title2';

    const component = render(
      <CSearchBar
        dataList={publicationsList}
        search={searchText}
        setSearch={setSearchMock}
        setFilteredDataSource={setFilteredDataSourceMock}
      />,
    );
    const textInput = component.getByTestId('search');

    fireEvent.changeText(textInput, changeTextTo);

    expect(setSearchMock).toHaveBeenCalled();
    expect(setSearchMock).toHaveBeenCalledWith(changeTextTo);
  });

  it('debe ejecutarse las funcion setFilteredDataSource con el nuevo array de publicaciones según el texto ingresado', () => {
    const changeTextTo = 'title2';

    const component = render(
      <CSearchBar
        dataList={publicationsList}
        search={searchText}
        setSearch={setSearchMock}
        setFilteredDataSource={setFilteredDataSourceMock}
      />,
    );
    const textInput = component.getByTestId('search');

    fireEvent.changeText(textInput, changeTextTo);

    const newData = publicationsList.filter(publication => publication.title == changeTextTo)

    expect(setFilteredDataSourceMock).toHaveBeenCalled();
    expect(setFilteredDataSourceMock).toHaveBeenCalledWith(newData);
  });
});
