interface CreateRequestProps {
  date: string;
  inning: string;
  phone: string;
  location: {
    city: string;
    province: string;
    address: string;
    district: string;
    reference?: string;
  };
}

interface DataActivationProps {
  card: string;
  deliveryOrderId: string;
}

interface CreateOrderProps {
  author: string;
  dataContentType: string;
  dataEncodingType: string;
  deliveryOrderId: string;
  id: string;
  source: string;
  time: string;
  transaction: string;
}

interface OrderStatusProps {
  deliveryDate: string;
  deliveryOrderId: string;
  inning: string;
  inningDescription: string;
  location: {
    address: string;
    city: string;
    deparment: string;
    district: string;
    province: string;
    reference?: string;
  };
  phoneNumber: string;
  status: string;
}

interface ActivateCardProps {
  message: string;
  id: string;
}

interface ActivationStatusProps {
  Id: string;
  card: string;
  status: string;
  time: number;
  user: string;
}

interface AddressFormValues {
  department: LocationProps | null;
  province: LocationProps | null;
  district: LocationProps | null;
  addressDelivery: string | null;
  addressReference?: string | null;
}
interface PhoneNumber {
  phoneNumber: string;
}

interface Contact {
  fullname: string;
  phone: string;
}

interface Address {
  department: LocationProps | null;
  province: LocationProps | null;
  district: LocationProps | null;
  address: string;
  label: string;
  reference?: string;
}

interface LocationProps {
  code: string;
  comment: string;
  description: string;
  enabled: number;
  parent: string;
  position?: number;
  delivery?: {
    minRevervationDays: number;
    maxSchedulableDays: number;
    availableInnings: AvailableInningProps[];
  };
}

interface AvailableInningProps {
  name: string;
  timeframe: {
    start: string;
    end: string;
  };
  capacity: number;
}

interface InningDetail {
  available: number,
  name: string,
  schedule: string,
  status: string,
}
interface CalendarDetails {
  dayData: {
    day: string,
    dayStatus: string,
    innings: InningDetail[],
  }
}
interface CalendarResponse {
  inningType: string,
  rangeDetail: CalendarDetails[],
  rangeEndDate: string,
  rangeStartDate: string,
}

export type {
  CreateRequestProps,
  DataActivationProps,
  CreateOrderProps,
  OrderStatusProps,
  ActivateCardProps,
  ActivationStatusProps,
  LocationProps,
  AvailableInningProps,
  AddressFormValues,
  PhoneNumber,
  Contact,
  Address,
  CalendarResponse,
  CalendarDetails,
  InningDetail,
};
