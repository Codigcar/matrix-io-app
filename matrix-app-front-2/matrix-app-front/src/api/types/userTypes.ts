export interface UserProps {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  preferUsername: null | string;
  status: 'PRODUCT_ACQUIRED' | 'ONBOARDING' | 'BLOCKED' | 'FRAUD_HOLD' | 'RESTORING_PRODUCT' | 'SUSPENDED';
  lastUpdate: string;
}

export const userStatus = {
  productAcquired: 'PRODUCT_ACQUIRED',
  onboarding: 'ONBOARDING',
  blocked: 'BLOCKED',
  fraudHold: 'FRAUD_HOLD',
  restoringProduct: 'RESTORING_PRODUCT',
  suspended: 'SUSPENDED',
};
