import { NavigatorScreenParams } from '@react-navigation/native';
import React from 'react';
import { SvgProps } from 'react-native-svg';
import { AuthRoutesEnum } from 'src/shared/enums/routes/auth-routes.enum';
import { SignUpRoutesEnum } from 'src/shared/enums/routes/signup-routes.enum';
import type { RootState as IRootState } from 'src/core/libraries-implementation';
import navigationScreenNames from 'src/utils/navigationScreenNames';

declare module '*.svg' {
  const content: React.FC<SvgProps>;
  export default content;
}

declare global {
  type RootState = IRootState;
  export namespace ReactNavigation {
    export type AuthNavigator = {
      [navigationScreenNames.login]: {
        identitySaved?: string;
      };
      PasswordRecover: undefined;
      [SignUpRoutesEnum.GET_DNI]: undefined;
      [SignUpRoutesEnum.GET_EMAIL]: {
        documentNumber: string;
      };
      [SignUpRoutesEnum.PASSWORD_VERIFICATION]: {
        email: string;
        documentNumber: string;
      };
      [SignUpRoutesEnum.PASSWORD_REPEAT]: {
        email: string;
        documentNumber: string;
        password: string;
      };
      [SignUpRoutesEnum.GET_PHONE]: {
        email: string;
        documentNumber: string;
        password: string;
      };
      [SignUpRoutesEnum.VERIFY_OTP]: {
        id: string;
        password: string;
        stack?: string;
        isBlocked?: boolean;
        destinationCustomFormat?: string;
        destination: string;
      };
      [SignUpRoutesEnum.OFFER_UNAVAILABLE]: {
        token: string;
      };
      [navigationScreenNames.challenge]: {
        action: string;
      }
    }

    export type PasswordRecoveryNavigator = {
      [navigationScreenNames.passwordRecovery.validateDni]: undefined;
      [navigationScreenNames.passwordRecovery.validateOTP]: {
        documentNumber: string;
      };
      [navigationScreenNames.passwordRecovery.newPassword]: {
        documentNumber: string;
        code: string;
      };
      [navigationScreenNames.passwordRecovery.recoverFullPassword]: {
        isOkResponse: boolean;
        code?: string;
      };
    };

    export type EnrollmentNavigator = {
      [navigationScreenNames.getPhone]: {
        email: string;
        documentNumber: string;
        password: string;
      };
      [navigationScreenNames.networkError]: undefined;
      [navigationScreenNames.verifyOTP]: {
        destination: string;
        phone?: string;
        email?: string;
        stack: 'email' | 'phone' | 'forgotPassword' | 'signUp' | 'verifyEmail';
        id: string | number[];
        password: string;
      };
      [navigationScreenNames.offerUnavailable]: {
        token: string;
      };
      [navigationScreenNames.passwordVerification]: {
        email: string;
        documentNumber: string;
      };
      [navigationScreenNames.passwordRepeat]: {
        email: string;
        documentNumber: string;
        password: string;
      };
    };

    export type RootStackParamList = {
      [AuthRoutesEnum.PASSWORD_RECOVERY_STACK]: NavigatorScreenParams<PasswordRecoveryNavigator>
      [navigationScreenNames.authStack]: NavigatorScreenParams<AuthNavigator>
      [navigationScreenNames.networkError]: undefined,
      [navigationScreenNames.documentDetail]: {
        title: string;
        url: string;
      };
      [navigationScreenNames.genericError]?: {
        logout?: string;
        nextScreen?: string;
        title?: string;
        subtitle?: string;
        text?: string;
        buttonLabel?: string;
      };
    };
    interface RootParamList extends RootStackParamList {}
  }
}

declare module 'react-redux' {
  interface DefaultRootState extends IRootState {}
}

type ObjectKeys<T> = T extends object
  ? (keyof T)[]
  : T extends number
  ? []
  : T extends Array<any> | string
  ? string[]
  : never;
interface ObjectConstructor {
  keys<T>(o: T): ObjectKeys<T>;
}

declare module '*.png';
