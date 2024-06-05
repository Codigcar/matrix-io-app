import React from 'react';
import { fireEvent, render, renderHook } from 'src/matrix-ui-components/utils/test-utils';
import { ForeignPurchaseRectable, InternetPurchaseRectangle } from 'assets/svgs';
import { testID } from '../../shared/strings/testID';
import IconSwitchListItem, { iconSelect } from '../../components/IconSwitchListItem';
import useIconSwitchListItem from '../../hooks/useIconSwitchListItem';
import { string } from '../../shared/strings/string';

interface ComponentRenderProps {
  loading?: boolean;
  isBlocked?: boolean;
  label?: string;
  onChange?: () => void;
}

interface ComponentIconSelectProps {
  type: string;
}

const mainComponentTestId = testID.iconSwitchListItem;

const ComponentRender = (props?: ComponentRenderProps) =>
  render(
    <IconSwitchListItem
      loading={props?.loading ?? false}
      isBlocked={props?.isBlocked ?? false}
      testID={mainComponentTestId}
      label={props?.label ?? 'label'}
      onChange={props?.onChange ?? jest.fn()}
    />,
  );

const ComponentIconSelect = (props: ComponentIconSelectProps) =>
  render(<>{iconSelect(props.type)}</>);
const ComponentForeignPurchaseRectable = () => render(<ForeignPurchaseRectable />);
const ComponentInternetPurchaseRectangle = () => render(<InternetPurchaseRectangle />);

describe('IconSwitchListItem component', () => {
  it('should render without errors', () => {
    const { getByTestId } = ComponentRender();
    const component = getByTestId(mainComponentTestId);
    expect(component).toBeTruthy();
  });

  it('should render loading switch', () => {
    const { getByTestId } = ComponentRender({ loading: true });
    const component = getByTestId(testID.iconSwitchListItemLoadingswitch);
    expect(component).toBeTruthy();
  });

  it('should render switch', () => {
    const { getByTestId } = ComponentRender();
    const component = getByTestId(testID.iconSwitchListItemSwitch);
    expect(component).toBeTruthy();
  });

  it('should render label', () => {
    const { getByText } = ComponentRender();
    const component = getByText('label');
    expect(component).toBeTruthy();
  });

  it('should be blocked', () => {
    const { getByTestId } = ComponentRender({ isBlocked: true });
    const component = getByTestId(testID.iconSwitchListItemSwitch);
    expect(component).toHaveAccessibilityState({ disabled: true });
  });

  it('should press switch', () => {
    const onChange = jest.fn();
    const { getByTestId } = ComponentRender({ onChange });
    const component = getByTestId(testID.iconSwitchListItemSwitch);
    fireEvent.press(component);
    expect(onChange).toHaveBeenCalled();
  });

  it('should render ComponentIconSelect correctly', () => {
    const internetComponent = ComponentIconSelect({ type: 'internet' });
    const foreignComponent = ComponentIconSelect({ type: 'foreign' });
    expect(internetComponent).toBeTruthy();
    expect(foreignComponent).toBeTruthy();
  });

  it('should render ComponentForeignPurchaseRectable correctly', () => {
    const component = ComponentForeignPurchaseRectable();
    expect(component).toBeTruthy();
  });

  it('should render ComponentInternetPurchaseRectangle correctly', () => {
    const component = ComponentInternetPurchaseRectangle();
    expect(component).toBeTruthy();
  });

  it('should render hook correctly', () => {
    const { result } = renderHook(() =>
      useIconSwitchListItem({
        label: 'label',
        onChange: jest.fn(),
        loading: false,
        isBlocked: false,
        status: false,
        type: 'card',
      }));

    expect(result.current.changeText()).toBe(string.desactivated);
    expect(result.current.changeColorStatus()).toBe('primary500');
  });

  it('should render hook correctly wit other params', () => {
    const { result } = renderHook(() =>
      useIconSwitchListItem({
        label: 'label',
        onChange: jest.fn(),
        loading: false,
        isBlocked: false,
        status: true,
        type: 'card',
      }));

    expect(result.current.changeText()).toBe(string.activated);
    expect(result.current.changeColorStatus()).toBe('complementaryMint700');
  });

  it('should render hook correctly wit other params (status false)', () => {
    const { result } = renderHook(() =>
      useIconSwitchListItem({
        label: 'label',
        onChange: jest.fn(),
        loading: false,
        isBlocked: false,
        status: false,
        type: 'other',
      }));

    expect(result.current.changeText()).toBe(string.desactivatedPurchases);
    expect(result.current.changeColorStatus()).toBe('primary500');
  });

  it('should render hook correctly wit other params (status true and other type)', () => {
    const { result } = renderHook(() =>
      useIconSwitchListItem({
        label: 'label',
        onChange: jest.fn(),
        loading: false,
        isBlocked: false,
        status: true,
        type: 'other',
      }));

    expect(result.current.changeText()).toBe(string.activatedPurchases);
    expect(result.current.changeColorStatus()).toBe('complementaryMint700');
  });

  it('should render hook correctly wit other params (status false with type card)', () => {
    const { result } = renderHook(() =>
      useIconSwitchListItem({
        label: 'label',
        onChange: jest.fn(),
        loading: false,
        isBlocked: false,
        status: false,
        type: 'card',
      }));

    expect(result.current.changeText()).toBe(string.desactivated);
    expect(result.current.changeColorStatus()).toBe('primary500');
  });

  it('should match snapshot', () => {
    const { toJSON } = ComponentRender();
    expect(toJSON()).toMatchSnapshot();
  });
});
