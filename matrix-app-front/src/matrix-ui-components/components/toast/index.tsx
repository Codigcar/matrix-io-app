import React from 'react';
import { Pressable } from 'react-native';
import { Box, Text, Theme } from 'matrix-ui-components';
import ToastDefault, { ToastConfigParams, ToastShowParams } from 'react-native-toast-message';
import Icon from 'libs/ui-toolkit/components/mtx-icon/MtxIcon';
import InfoCircle from 'assets/svgs/info-circle.svg';
import {
  ToastDangerIcon,
  ToastInfoIcon,
  ToastSuccessIcon,
  ToastWarningIcon,
  ToastBlackIcon,
} from 'assets/svgs';
import {
  createBox,
  createVariant,
  VariantProps,
  createRestyleComponent,
} from '@shopify/restyle';
import { TIME_TO_SHOW_TOAST_DEFAULT } from 'src/utils/constants';

export enum ToastType {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
  TypeDanger = 'dangerType',
  TypeInfo = 'infoType',
  TypeSuccess = 'successType',
  TypeWarning = 'warningType',
  TypeBlack = 'blackType',
}

export const BoxBase = createBox<Theme>();

const ToastBox = createRestyleComponent<
  VariantProps<Theme, 'toastVariants'> & React.ComponentProps<typeof BoxBase>,
  Theme
>([createVariant({ themeKey: 'toastVariants' })], BoxBase);

type ToastParams = ToastShowParams & {
  title: string;
  message?: string;
};

export function showToast({
  title = 'Procesado',
  message,
  visibilityTime,
  props,
  ...params
}: ToastParams) {
  ToastDefault.show({
    ...params,
    visibilityTime: visibilityTime || TIME_TO_SHOW_TOAST_DEFAULT,
    props: { title, message, ...props },
  });
}

const colorMessage: { [key: string]: keyof Theme['colors'] } = {
  info: 'complementaryIndigo800',
  success: 'complementaryMint900',
  danger: 'FeedbackError600',
  warning: 'complementaryPumpking500',
};

type BaseToastProps = {
  message: string;
  icon: JSX.Element;
};

export const BaseToast: React.FC<BaseToastProps> = ({ message, icon }) => (
  <Box
    height={56}
    paddingHorizontal="spacing-xs"
    backgroundColor="white"
    flex={1}
    justifyContent="center"
    alignItems="center"
    borderRadius={5}
    width="86%"
    flexDirection="row"
  >
    <Box flex={1} justifyContent="center" alignItems="center">
      {icon}
    </Box>
    <Box flex={9} justifyContent="center" alignItems="flex-start">
      <Text variant="contentToastNotification">{message}</Text>
    </Box>
  </Box>
);

type RebrandingBaseToastProps = {
  title: string;
  message?: string;
  icon: JSX.Element;
  variant: keyof Theme['toastVariants'];
  onPress: ToastParams['onPress'];
};

const ToastStyle = {
  pressable: { width: '100%' },
};

export const RebrandingBaseToast: React.FC<RebrandingBaseToastProps> = ({
  title,
  message,
  icon,
  variant,
  onPress,
}) => {
  let titleVariant: keyof Theme['textVariants'] = 'messageToastNotification';
  let bodyVariant: keyof Theme['textVariants'] = 'bodyToastNotification';
  const variantInfo: keyof Theme['toastVariants'] = 'info';

  if (variant === variantInfo) {
    titleVariant = 'messageInfoToastNotification';
    bodyVariant = 'bodyInfoToastNotification';
  }

  return (
    <Pressable style={ToastStyle.pressable} onPress={onPress}>
      <ToastBox
        flex={1}
        variant={variant}
        borderWidth={1}
        borderRadius={16}
        flexDirection="row"
        padding="spacing-s"
        mx="spacing-m"
      >
        <Box>{icon}</Box>
        <Box flex={1} ml="spacing-xxs">
          <Text variant={titleVariant} color={colorMessage[variant]}>
            {title}
          </Text>
          {message && (
            <Text variant={bodyVariant} mt="spacing-xxxs">
              {message}
            </Text>
          )}
        </Box>
      </ToastBox>
    </Pressable>
  );
};

RebrandingBaseToast.defaultProps = {
  message: undefined,
};

const toastConfig = () => ({
  success: ({ props }: ToastConfigParams<{ title: string }>) => (
    <BaseToast message={props.title} icon={<Icon name="checkCircle" />} />
  ),

  error: ({ props }: ToastConfigParams<{ title: string }>) => (
    <BaseToast message={props.title} icon={<Icon name="errorCircle" />} />
  ),

  warning: ({ props }: ToastConfigParams<{ title: string }>) => (
    <BaseToast message={props.title} icon={<Icon name="warningCircle" />} />
  ),

  info: ({ props }: ToastConfigParams<{ title: string }>) => (
    <BaseToast message={props.title} icon={<InfoCircle />} />
  ),

  dangerType: ({ props, onPress }: ToastConfigParams<RebrandingBaseToastProps>) => (
    <RebrandingBaseToast
      title={props.title}
      message={props.message}
      icon={<ToastDangerIcon />}
      onPress={onPress}
      variant="danger"
    />
  ),
  infoType: ({ props, onPress }: ToastConfigParams<RebrandingBaseToastProps>) => (
    <RebrandingBaseToast
      title={props.title}
      message={props.message}
      icon={<ToastInfoIcon />}
      onPress={onPress}
      variant="info"
    />
  ),
  successType: ({ props, onPress }: ToastConfigParams<RebrandingBaseToastProps>) => (
    <RebrandingBaseToast
      title={props.title}
      message={props.message}
      icon={<ToastSuccessIcon />}
      onPress={onPress}
      variant="success"
    />
  ),
  warningType: ({ props, onPress }: ToastConfigParams<RebrandingBaseToastProps>) => (
    <RebrandingBaseToast
      title={props.title}
      message={props.message}
      icon={<ToastWarningIcon />}
      onPress={onPress}
      variant="warning"
    />
  ),
  blackType: ({ props, onPress }: ToastConfigParams<RebrandingBaseToastProps>) => (
    <RebrandingBaseToast
      title={props.title}
      message={props.message}
      icon={<ToastBlackIcon />}
      onPress={onPress}
      variant="black"
    />
  ),
});
export const Toast = () => <ToastDefault config={toastConfig()} />;

export default Toast;