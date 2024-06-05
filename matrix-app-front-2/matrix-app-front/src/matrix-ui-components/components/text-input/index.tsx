import { SpacingProps, VariantProps } from '@shopify/restyle';
import React, { LegacyRef, useEffect, useState } from 'react';
import { StyleSheet, TextInput as RNTextInput, TouchableOpacity } from 'react-native';
import CustomIcon from 'src/utils/CustomIcon';
import MtxIcon from 'libs/ui-toolkit/components/mtx-icon/MtxIcon';
import { logVirtualEventAnalytics } from 'src/utils/Analytics';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  Box, Text, useTheme, Theme, TouchableOpacityBox,
} from 'matrix-ui-components';
import { Eye, EyeSlash } from 'assets/svgs';
import { vs } from 'src/utils/sizes';
import { AnalyticsProps } from 'src/types/types';
import PasteInput, { PasteInputProps } from '@mattermost/react-native-paste-input';
import Clipboard from '@react-native-clipboard/clipboard';
import { android } from 'src/utils/constants';

type TextInputProps = React.ComponentPropsWithRef<typeof RNTextInput> &
  Partial<PasteInputProps> & {
    label: string;
    icon?: React.ReactNode;
    error?: boolean;
    textHelper?: string;
    disabled?: boolean;
    containerProps?: SpacingProps<Theme>;
    letterSpacing?: number;
    height?: number;
    leftIcon?: {
      height: number;
      width: number;
      color?: string;
      name: string;
      prefix?: string;
    };
    rightIcon?: {
      height: number;
      width: number;
      color?: string;
      name: string;
    };
    innerRef?: React.Ref<RNTextInput>;
    showTextHelper?: boolean;
  };
type Props = TextInputProps &
  SpacingProps<Theme> &
  VariantProps<Theme, 'textVariants'> &
  AnalyticsProps;

const TextInputBase = React.forwardRef((props: Partial<Props>, innerRef) => {
  const {
    disableCopyPaste,
    onSelectionChange,
    onFocus,
    ...rest
  } = props;

  if (disableCopyPaste) {
    if (android) {
      return <PasteInput ref={innerRef} onPaste={() => null} {...props} />;
    }
    return (
      <RNTextInput
        {...rest}
        ref={innerRef as LegacyRef<RNTextInput>}
        onSelectionChange={(e) => {
          Clipboard.setString('');
          onSelectionChange?.(e);
        }}
        onFocus={(e) => {
          Clipboard.setString('');
          onFocus?.(e);
        }}
      />
    );
  }
  return <RNTextInput {...props} ref={innerRef as LegacyRef<RNTextInput>} />;
});

export const TextInput: React.FC<Props> = ({
  ref,
  variant,
  innerRef,
  analytics,
  ...rest
}) => {
  const { fonts, colors, rebranding } = useTheme();
  const [focus, setFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(rest.secureTextEntry);
  const boxBorderFocus = !focus && !rest.value ? 'primaryMedium' : 'primaryDark';
  const boxBorder = !rest.error ? boxBorderFocus : 'redError';
  const Styles = StyleSheet.create({
    input: {
      fontFamily: fonts.euclidCircularMedium,
      fontSize: 14,
      minHeight: rest.height ? rest.height : 'auto',
      color: rest.disabled ? colors.gray400 : colors.primaryDarkest,
      flex: 1,
      padding: 0,
      letterSpacing: rest.letterSpacing || 1,
    },
    leftIcon: {
      height: '100%',
      alignItems: 'center',
      paddingLeft: 12,
      paddingRight: 5,
      marginRight: 10,
      flexDirection: 'row',
      borderTopStartRadius: vs(30),
      borderBottomStartRadius: vs(30),
      backgroundColor: colors.complementaryPrimary100,
    },
  });

  useEffect(() => {
    if (analytics !== false && rest.error && rest.textHelper) {
      logVirtualEventAnalytics({
        tipoEvento: 'Visualizar',
        tipoElemento: 'Mensaje de Error',
        valor: rest.textHelper,
        ...(typeof analytics === 'object' ? analytics : {}),
      });
    }
  }, [rest.error]);

  if (rebranding) {
    return (
      <Box {...rest.containerProps}>
        <Text color="primaryDarkest" mb="spacing-xxxs" variant={variant ?? 'body13pxRegular'}>
          {rest.label}
        </Text>
        <Box
          borderWidth={focus && !!rest.value ? 2 : 1}
          borderRadius={!rest.multiline ? vs(30) : vs(24)}
          borderColor={rest.disabled ? 'primary400' : boxBorder}
          height={!rest.multiline ? vs(48) : vs(80)}
          px="spacing-s"
          pl={rest.leftIcon?.name ? 'spacing-none' : 'spacing-s'}
          bg={rest.disabled ? 'primary100' : 'white'}
          alignItems="center"
          flexDirection="row"
        >
          {rest.leftIcon?.name && (
            <Box style={Styles.leftIcon}>
              <MtxIcon
                name={rest.leftIcon.name}
                width={rest.leftIcon.width}
                height={rest.leftIcon.width}
                strokeColor={rest.leftIcon.color}
              />
              {rest.leftIcon.prefix && (
                <Text variant="body14Medium" px="spacing-xxxxs">
                  {rest.leftIcon.prefix}
                </Text>
              )}
            </Box>
          )}
          <TextInputBase
            style={[
              Styles.input,
              {
                fontFamily: fonts.outfitRegular,
                fontSize: RFValue(12.25),
                letterSpacing: RFValue(0.14),
              },
            ]}
            ref={ref || innerRef}
            editable={!rest.disabled}
            {...rest}
            onFocus={(e) => {
              setFocus(true);
              rest.onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocus(false);
              rest.onBlur?.(e);
            }}
            placeholderTextColor={colors.primaryMedium}
            secureTextEntry={showPassword}
            contextMenuHidden
            autoCorrect={false}
            autoComplete="off"
            selectionColor={colors.gray200}
          />
          {rest.secureTextEntry && (
            <TouchableOpacityBox
              disabled={rest.disabled}
              position="absolute"
              right={RFValue(12)}
              onPress={() => setShowPassword(!showPassword)}
            >
              {!showPassword ? <Eye /> : <EyeSlash />}
            </TouchableOpacityBox>
          )}
          {rest.rightIcon?.name ? (
            <Box position="absolute" right={15}>
              <MtxIcon
                name={rest.rightIcon.name}
                width={rest.rightIcon.width}
                height={rest.rightIcon.width}
                strokeColor={rest.rightIcon.color}
              />
            </Box>
          ) : null}
        </Box>
        {rest.error || rest.showTextHelper ? (
          <Box position="absolute" top="100%">
            <Text
              mt="spacing-xxxs"
              ml="spacing-s"
              variant="body12Medium"
              color={rest.error ? 'redError' : 'primary600'}
            >
              {rest.textHelper}
            </Text>
          </Box>
        ) : null}
      </Box>
    );
  }

  return (
    <Box {...rest.containerProps}>
      <Text
        color="primaryDarkest"
        mb="spacing-xs"
        fontFamily={fonts.euclidCircularMedium}
        variant="body"
      >
        {rest.label}
      </Text>
      <Box
        borderWidth={focus ? 2 : 1}
        borderRadius={8}
        borderColor={rest.disabled ? 'primaryLigth' : boxBorder}
        py="spacing-xs"
        px="spacing-s"
        bg={rest.disabled ? 'secundaryDisable' : 'white'}
        alignItems="center"
        flexDirection="row"
      >
        <TextInputBase
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={Styles.input}
          ref={ref}
          editable={!rest.disabled}
          {...rest}
          placeholderTextColor={colors.primaryMedium}
          secureTextEntry={showPassword}
          contextMenuHidden
          autoCorrect={false}
          autoComplete="off"
          selectionColor={colors.gray200}
        />
        {rest.secureTextEntry && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <CustomIcon name={showPassword ? 'ic_eye_slash_r' : 'ic_eye_r'} size={24} />
          </TouchableOpacity>
        )}
        {rest.rightIcon?.name ? (
          <Box position="absolute" right={15}>
            <MtxIcon
              name={rest.rightIcon.name}
              width={rest.rightIcon.width}
              height={rest.rightIcon.width}
              strokeColor={rest.rightIcon.color}
            />
          </Box>
        ) : null}
      </Box>
      {rest.error ? (
        <Text
          mt="spacing-xxxs"
          variant="SubHead"
          fontFamily={fonts.euclidCircularRegular}
          color="redError"
        >
          {rest.textHelper}
        </Text>
      ) : null}
    </Box>
  );
};

TextInput.defaultProps = {
  icon: undefined,
  error: undefined,
  textHelper: undefined,
  disabled: undefined,
  containerProps: undefined,
  letterSpacing: undefined,
  height: undefined,
  leftIcon: undefined,
  rightIcon: undefined,
  innerRef: undefined,
  showTextHelper: undefined,
};

export default TextInput;
