/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { View } from 'react-native';
import Pencil from 'assets/icons/svgs/pencil';
import BackArrow from 'assets/icons/svgs/backArrow';
import LogoutIcon from 'assets/icons/svgs/logout';
import Close from 'assets/icons/svgs/close';
import Home from 'assets/icons/svgs/home';
import Ticket from 'assets/icons/svgs/ticket';
import TicketGradient from 'assets/icons/svgs/ticketGradient';
import Card from 'assets/icons/svgs/card';
import CardPos from 'assets/icons/svgs/cardPos';
import UserTag from 'assets/icons/svgs/userTag';
import EyeOpen from 'assets/icons/svgs/eyeOpen';
import VisaLogo from 'assets/icons/svgs/visaLogo';
import Notification from 'assets/icons/svgs/notification';
import Settings from 'assets/icons/svgs/settings';
import Receipt from 'assets/icons/svgs/receipt';
import UserSquare from 'assets/icons/svgs/userSquare';
import Calendar from 'assets/icons/svgs/calendar';
import CardEdit from 'assets/icons/svgs/cardEdit';
import EyeSlash from 'assets/icons/svgs/eyeSlash';
import Copy from 'assets/icons/svgs/copy';
import FaceScan from 'assets/icons/svgs/faceScan';
import StepIndicatorInit from 'assets/icons/svgs/stepIndicatorInit';
import Tick from 'assets/icons/svgs/tick';
import Error from 'assets/icons/svgs/error';
import DocumentFront from 'assets/icons/svgs/documentFront';
import LoadingUnion from 'assets/icons/svgs/loadingUnion';
import LoadingIndicator from 'assets/icons/svgs/loadingIndicator';
import CheckWarning from 'assets/icons/svgs/checkWarning';
import CheckSuccess from 'assets/icons/svgs/checkSuccess';
import SadFace from 'assets/icons/svgs/sadFace';
import CheckCircle from 'assets/icons/svgs/checkCircle';
import ErrorCircle from 'assets/icons/svgs/errorCircle';
import CardLiquid from 'assets/icons/svgs/cardLiquid';
import CardLiquidFull from 'assets/icons/svgs/cardLiquidFull';
import Warning from 'assets/icons/svgs/warning';
import Trash from 'assets/icons/svgs/trash';
import DownArrowCircle from 'assets/icons/svgs/downArrowCircle';
import UpArrowCircle from 'assets/icons/svgs/upArrowCircle';
import WarningCircle from 'assets/icons/svgs/warningCircle';
import DocumentDownload from 'assets/icons/svgs/documentDownload';
import MoneyChange from 'assets/icons/svgs/moneyChange';
import NotificationBing from 'assets/icons/svgs/notificationBing';
import HappyFace from 'assets/icons/svgs/happyFace';
import Dollar from 'assets/icons/svgs/dollar';
import Clock from 'assets/icons/svgs/clock';
import RightArrow from 'assets/icons/svgs/rightArrow';
import Date from 'assets/icons/svgs/date';
import TransactionInProcess from 'assets/icons/svgs/transactionInProcess';
import TransactionCompleted from 'assets/icons/svgs/transactionCompleted';
import TransactionExtorn from 'assets/icons/svgs/transactionExtorn';
import TransactionFailed from 'assets/icons/svgs/transactionFailed';
import TransactionPayed from 'assets/icons/svgs/transactionPayed';
import Smile from 'assets/icons/svgs/smile';
import Filter from 'assets/icons/svgs/filter';
import WarningTriangle from 'assets/icons/svgs/warningTriangle';
import CardLiquidDark from 'assets/icons/svgs/cardLiquidDark';
import CardLiquidFullDark from 'assets/icons/svgs/cardLiquidFull';
import CardWithStar from 'assets/icons/svgs/cardWithStar';
import FaceId from 'assets/icons/svgs/faceId';
import TouchId from 'assets/icons/svgs/touchId';
import FaceIdOk from 'assets/icons/svgs/faceIdOk';
import TouchIdOk from 'assets/icons/svgs/touchOk';
import MasterCard from 'assets/icons/svgs/masterCard';
import CardAdd from 'assets/icons/svgs/cardAdd';
import Amex from 'assets/icons/svgs/amex';
import DinersClub from 'assets/icons/svgs/dinersClub';
import SadFaceWithShadow from 'assets/icons/svgs/sadFaceWithShadow';
import CheckWarningWithShadow from 'assets/icons/svgs/checkWarningWithShadow';
import { FlagPe } from 'assets/svgs';
import IconProps from './types/iconTypes';
import iconSize from './styles/size';

/**
 * @deprecated The component should not be used
 */
const MtxIcon = ({
  name,
  size,
  disabled = false,
  width,
  height,
  x,
  y,
  strokeColor,
  fill,
}: IconProps): JSX.Element => {
  let localSize;
  switch (size) {
    case 'xsmall':
      localSize = iconSize.xsmall;
      break;
    case 'small':
      localSize = iconSize.small;
      break;
    case 'normal':
      localSize = iconSize.normal;
      break;
    case 'medium':
      localSize = iconSize.medium;
      break;
    case 'large':
      localSize = iconSize.large;
      break;
    case 'xlarge':
      localSize = iconSize.xlarge;
      break;
    default:
      localSize = iconSize.normal;
      break;
  }

  const localProps: IconProps = {
    width: width || localSize,
    height: height || localSize,
    x,
    y,
    strokeColor,
    fill,
  };

  switch (name) {
    case 'pencil':
      return <Pencil {...localProps} />;
    case 'backArrow':
      return <BackArrow {...localProps} />;
    case 'close':
      return <Close />;
    case 'home':
      return <Home {...localProps} />;
    case 'ticket':
      return <Ticket {...localProps} />;
    case 'card':
      return <Card {...localProps} />;
    case 'cardPos':
      return <CardPos {...localProps} />;
    case 'userTag':
      return <UserTag {...localProps} />;
    case 'logout':
      return <LogoutIcon {...localProps} />;
    case 'eyeOpen':
      return <EyeOpen {...localProps} />;
    case 'visaLogo':
      return <VisaLogo {...localProps} />;
    case 'warning':
      return <Warning {...localProps} />;
    case 'notification':
      return <Notification {...localProps} />;
    case 'settings':
      return <Settings {...localProps} />;
    case 'receipt':
      return <Receipt {...localProps} />;
    case 'userSquare':
      return <UserSquare {...localProps} />;
    case 'calendar':
      return <Calendar {...localProps} />;
    case 'cardEdit':
      return <CardEdit {...localProps} />;
    case 'eyeSlash':
      return <EyeSlash {...localProps} />;
    case 'cardLiquid':
      return <CardLiquid {...localProps} />;
    case 'cardLiquidFull':
      return <CardLiquidFull {...localProps} />;
    case 'ticketGradient':
      return <TicketGradient {...localProps} />;
    case 'copy':
      return <Copy {...localProps} />;
    case 'faceScan':
      return <FaceScan {...localProps} />;
    case 'stepIndicatorInit':
      return <StepIndicatorInit {...localProps} />;
    case 'tick':
      return <Tick {...localProps} />;
    case 'error':
      return <Error {...localProps} />;
    case 'documentFront':
      return <DocumentFront {...localProps} />;
    case 'loadingUnion':
      return <LoadingUnion {...localProps} />;
    case 'loadingIndicator':
      return <LoadingIndicator {...localProps} />;
    case 'checkWarning':
      return <CheckWarning {...localProps} />;
    case 'checkSuccess':
      return <CheckSuccess {...localProps} />;
    case 'sadFace':
      return <SadFace {...localProps} />;
    case 'checkCircle':
      return <CheckCircle {...localProps} />;
    case 'errorCircle':
      return <ErrorCircle {...localProps} />;
    case 'warningCircle':
      return <WarningCircle {...localProps} />;
    case 'trash':
      return <Trash {...localProps} />;
    case 'downArrowCircle':
      return <DownArrowCircle {...localProps} />;
    case 'upArrowCircle':
      return <UpArrowCircle {...localProps} />;
    case 'documentDownload':
      return <DocumentDownload {...localProps} />;
    case 'moneyChange':
      return <MoneyChange {...localProps} />;
    case 'notificationBing':
      return <NotificationBing {...localProps} />;
    case 'dollar':
      return <Dollar {...localProps} />;
    case 'clock':
      return <Clock {...localProps} />;
    case 'happyFace':
      return <HappyFace {...localProps} />;
    case 'rightArrow':
      return <RightArrow {...localProps} />;
    case 'warningTriangle':
      return <WarningTriangle {...localProps} />;
    case 'cardLiquidDark':
      return <CardLiquidDark {...localProps} />;
    case 'cardLiquidFullDark':
      return <CardLiquidFullDark {...localProps} />;
    case 'date':
      return <Date {...localProps} />;
    case 'transactionInProcess':
      return <TransactionInProcess {...localProps} />;
    case 'transactionCompleted':
      return <TransactionCompleted {...localProps} />;
    case 'transactionExtorn':
      return <TransactionExtorn {...localProps} />;
    case 'transactionFailed':
      return <TransactionFailed {...localProps} />;
    case 'transactionPayed':
      return <TransactionPayed {...localProps} />;
    case 'smile':
      return <Smile {...localProps} />;
    case 'filter':
      return <Filter {...localProps} />;
    case 'cardWithStar':
      return <CardWithStar {...localProps} />;
    case 'faceId':
      return <FaceId {...localProps} />;
    case 'touchId':
      return <TouchId {...localProps} />;
    case 'faceIdOk':
      return <FaceIdOk {...localProps} />;
    case 'touchIdOk':
      return <TouchIdOk {...localProps} />;
    case 'masterCard':
      return <MasterCard {...localProps} />;
    case 'cardAdd':
      return <CardAdd {...localProps} />;
    case 'amex':
      return <Amex {...localProps} />;
    case 'dinersClub':
      return <DinersClub {...localProps} />;
    case 'sadFaceWithShadow':
      return <SadFaceWithShadow {...localProps} />;
    case 'checkWarningWithShadow':
      return <CheckWarningWithShadow {...localProps} />;
    case 'flagPe':
      return <FlagPe {...localProps} />;
    default:
      return <View />;
  }
};

export default MtxIcon;
