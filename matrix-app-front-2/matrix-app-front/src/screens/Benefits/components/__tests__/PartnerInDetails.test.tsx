import React from 'react';
import { ThemeProvider } from '@shopify/restyle';
import { rebrandingTheme } from 'matrix-ui-components';
import { render } from '@testing-library/react-native';
import { Platform } from 'react-native';
import { DOCUMENTS_BASE_URL } from 'src/utils/constants';
import PartnerInDetails from '../PartnerInDetails';

describe('PartnerInDetails', () => {
  const partnerName = 'Partner Name';
  const category = 'Category';
  const imgPathLogo = 'path/to/logo.png';

  const originalPlatform = Platform.OS;

  afterAll(() => {
    Platform.OS = originalPlatform;
  });

  it('should render correctly with provided props', () => {
    const { getByText } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <PartnerInDetails partnerName={partnerName} category={category} imgPathLogo={imgPathLogo} />
      </ThemeProvider>,
    );

    expect(getByText(partnerName)).toBeTruthy();
    expect(getByText(category)).toBeTruthy();
  });

  it('should apply the correct resizeMode based on the platform', () => {
    const resizeModeExpected = Platform.OS === 'ios' ? 'stretch' : 'cover';

    const { getByTestId } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <PartnerInDetails partnerName={partnerName} category={category} imgPathLogo={imgPathLogo} />
      </ThemeProvider>,
    );

    const imageBox = getByTestId('imageBox');
    expect(imageBox.props.resizeMode).toBe(resizeModeExpected);
  });

  it('should correctly construct the image URI', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <PartnerInDetails partnerName={partnerName} category={category} imgPathLogo={imgPathLogo} />
      </ThemeProvider>,
    );

    const imageBox = getByTestId('imageBox');
    expect(imageBox.props.source.uri).toBe(DOCUMENTS_BASE_URL + imgPathLogo);
  });

  it('should render correctly without props', () => {
    const { queryByTestId } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <PartnerInDetails imgPathLogo={undefined} partnerName={undefined} category={undefined} />
      </ThemeProvider>,
    );

    const imageBox = queryByTestId('imageBox');
    expect(imageBox).toBeTruthy();

    const subTitleText = queryByTestId('subTitleTextInDetails');
    expect(subTitleText).toBeNull();

    const categoryText = queryByTestId('categoryText');
    expect(categoryText).toBeNull();
  });

  it('should use resizeMode "stretch" on iOS', () => {
    Platform.OS = 'ios';
    const { getByTestId } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <PartnerInDetails imgPathLogo="logo.png" partnerName="Partner Name" category="Category" />
      </ThemeProvider>,
    );

    const imageBox = getByTestId('imageBox');
    expect(imageBox.props.resizeMode).toBe('stretch');
  });

  it('should use resizeMode "cover" on Android', () => {
    Platform.OS = 'android';
    const { getByTestId } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <PartnerInDetails imgPathLogo="logo.png" partnerName="Partner Name" category="Category" />
      </ThemeProvider>,
    );

    const imageBox = getByTestId('imageBox');
    expect(imageBox.props.resizeMode).toBe('cover');
  });
});
