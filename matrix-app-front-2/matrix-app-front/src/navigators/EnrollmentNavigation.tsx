import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Assets
import MtxLeftArrowIcon from 'src/components/LeftArrowIcon/MtxLeftArrowIcon';
// Utils
import navigationScreenNames from 'src/utils/navigationScreenNames';
// Screens
import DocumentDetail from 'src/screens/Enrollment/GetData/DocumentDetail/DocumentDetail';
// KYC
import MtxStartProcess from 'src/screens/KYC/DocumentValidation/StartDocumentValidation/MtxStartDocumentValidation';
import MtxIntroductionDocumentScan from 'src/screens/KYC/DocumentValidation/IntroductionDocumentScan/MtxIntroductionDocumentScan';
import GetDocumentFront from 'src/screens/KYC/DocumentValidation/GetDocumentFront/GetDocumentFront';
import DocumentFrontPreview from 'src/screens/KYC/DocumentValidation/DocumentFrontPreview/DocumentFrontPreview';
import GetDocumentReverse from 'src/screens/KYC/DocumentValidation/GetDocumentReverse/GetDocumentReverse';
import DocumentReversePreview from 'src/screens/KYC/DocumentValidation/DocumentReversePreview/DocumentReversePreview';
import MtxDocumentValidationLoading from 'src/screens/KYC/DocumentValidation/DocumentValidationLoading/DocumentValidationLoading';
import MtxDocumentValidationResponse from 'src/screens/KYC/DocumentValidation/DocumentValidationResponse/DocumentValidationResponse';
import GenericError from 'src/components/GenericError/GenericError';
import ManualCheck from 'src/screens/KYC/ManualCheck/ManualCheck';
import LivenessNavigation from './LivenessNavigation';
import PersonalDataNavigation from './PersonalDataNavigation';
import CardOfferNavigation from './CardOfferNavigation';
// Select Plan
import MtxSelectPlan from '../screens/Enrollment/GetPlans/MtxSelectPlan';

const Stack = createNativeStackNavigator();

const defaultConfig = {
  headerShown: false,
};

const renderLeftArrow = (): JSX.Element => <MtxLeftArrowIcon />;

const EnrollmentNavigation = () => (
  <Stack.Navigator
    screenOptions={defaultConfig}
    initialRouteName={navigationScreenNames.startDocumentValidation}
  >
    <Stack.Screen name={navigationScreenNames.documentDetail} component={DocumentDetail} />
    <Stack.Screen
      name="SelectPlan"
      component={MtxSelectPlan}
      options={{
        headerLeft: renderLeftArrow,
        title: '',
      }}
    />
    <Stack.Screen
      name={navigationScreenNames.startDocumentValidation}
      component={MtxStartProcess}
    />
    <Stack.Screen
      name={navigationScreenNames.introductionDocumentScan}
      component={MtxIntroductionDocumentScan}
    />
    <Stack.Screen name={navigationScreenNames.getDocumentFront} component={GetDocumentFront} />
    <Stack.Screen
      name={navigationScreenNames.documentFrontPreview}
      component={DocumentFrontPreview}
    />
    <Stack.Screen name={navigationScreenNames.getDocumentReverse} component={GetDocumentReverse} />
    <Stack.Screen
      name={navigationScreenNames.documentReversePreview}
      component={DocumentReversePreview}
    />
    <Stack.Screen
      name={navigationScreenNames.manualCheck}
      component={ManualCheck}
      initialParams={{
        stack: 'documentValidation',
      }}
    />
    <Stack.Screen
      name={navigationScreenNames.documentValidationLoading}
      component={MtxDocumentValidationLoading}
      initialParams={{
        origin: 'Enrollment',
      }}
    />
    <Stack.Screen
      name={navigationScreenNames.validationResponse}
      component={MtxDocumentValidationResponse}
      initialParams={{
        isOk: false,
      }}
    />
    <Stack.Screen name={navigationScreenNames.livenessStack} component={LivenessNavigation} />
    <Stack.Screen
      name={navigationScreenNames.personalDataStack}
      component={PersonalDataNavigation}
    />
    <Stack.Screen name={navigationScreenNames.cardOfferStack} component={CardOfferNavigation} />
    <Stack.Screen name={navigationScreenNames.genericError} component={GenericError} />
  </Stack.Navigator>
);

export default EnrollmentNavigation;
