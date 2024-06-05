import { Address, AddressFormValues, PhoneNumber } from 'src/api/types/requestPhysicalCardTypes';
import { NavigationPropsType } from 'src/types/types';

export interface CardCodeInputProps {
  codeLength: 3 | 4;
  value: string;
  handlerChange: () => void;
  inputRef: any;
  autoFocus: boolean;
  placeholder: string;
  handlerKeyPress: () => void;
}

export interface ChipStatusProps {
  state: string;
}

export interface AddressFormProps {
  addressEdit: Address;
  onSubmit: (values: AddressFormValues) => void;
  props: NavigationPropsType;
}

export interface ErrorChangePinSdkModalProps {
  isVisible: boolean;
  onClose?: () => void;
  cancelButton: () => void;
  transparent?: boolean;
  afterActivate: boolean;
}

export interface ForgotPinModalProps {
  isVisible: boolean;
  onClose?: () => void;
  cancelButton: () => void;
  transparent?: boolean;
}

export interface InactiveCardModalProps {
  isVisible: boolean;
  onClose?: () => void;
  goConfigureButton: () => void;
  cancelButton: () => void;
  transparent?: boolean;
  isVirtual: boolean;
}

export interface InningButtonProps {
  isSelected: boolean;
  buttonText: string;
  onPress: () => void;
}

export interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  title: string;
}

export interface OrderSumaryProps {
  name: string;
  date: string;
  hour: string;
  address: string;
  addressLabel: string;
  phoneNumber: string;
}

export interface PhoneFormProps {
  onSubmit: (values: PhoneNumber) => void;
  phoneNumber: string | null;
}

export type DotProps = {
  isCurrent: boolean;
  size?: number;
};

export type PaginatorProps = {
  data: {
    id: string;
    type: string;
    title?: string;
    text: string;
    iconName?: string;
    image?: React.ReactNode;
  }[];
  currentPage: number;
};

export type SliderProps = {
  data: {
    id: string;
    type: string;
    title?: string;
    text: string;
    iconName?: string;
    image?: React.ReactNode;
  }[];
};

export type SliderItemProps = {
  item: {
    id: string;
    text: string;
    type: string;
    title?: string;
    iconName?: string;
    image?: React.ReactNode;
  };
};
