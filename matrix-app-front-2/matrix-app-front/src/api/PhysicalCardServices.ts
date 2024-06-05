import { baseApi } from './index';
import {
  CreateRequestProps,
  DataActivationProps,
  CreateOrderProps,
  OrderStatusProps,
  ActivateCardProps,
  ActivationStatusProps,
  LocationProps,
  CalendarResponse,
} from './types/requestPhysicalCardTypes';

const cardActivation = {
  activate: '/v1/me/cards/activation',
  status: '/v1/me/cards/activation/',
};

const requestCard = {
  create: '/v1/me/cards/delivery-order',
  locations: 'v1/me/cards/delivery-schedule/locations?parent=',
  calendarAvailables: 'v1/me/cards/delivery-schedule/availables?location=',
  lastStatusDelivery: 'v1/me/cards/delivery-orders/last?count=1&sort=time.desc',
};

const getLocations = async (ubigeo: string): Promise<LocationProps[]> => {
  const url = requestCard.locations + ubigeo;
  const { data } = await baseApi.get(url);
  return data;
};

const getCalendar = async (ubigeo: string): Promise<CalendarResponse> => {
  const url = requestCard.calendarAvailables + ubigeo;
  const { data } = await baseApi.get(url);
  return data;
};

const getLastStatusDelivery = async (): Promise<OrderStatusProps[]> => {
  const { data } = await baseApi.get(requestCard.lastStatusDelivery);
  return data;
};

const createDeliveryOrder = async (deliveryData: CreateRequestProps): Promise<CreateOrderProps> => {
  const { data } = await baseApi.post(requestCard.create, deliveryData);
  return data;
};

const getStatusActivation = async (cardId: string): Promise<ActivationStatusProps> => {
  const url = cardActivation.status + cardId;
  const { data } = await baseApi.get(url);
  return data;
};

const activateCard = async (dataActivation: DataActivationProps): Promise<ActivateCardProps> => {
  const { data } = await baseApi.post(cardActivation.activate, dataActivation);
  return data;
};

export {
  getLocations,
  getCalendar,
  getLastStatusDelivery,
  createDeliveryOrder,
  getStatusActivation,
  activateCard,
};
