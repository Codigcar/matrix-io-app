export interface IOnboardingData {
  user: {
    name: string;
    lastName: string;
    documentNumber: string;
    location: { address: string; district: string; province: string; state: string };
  };
  account: {
    id: string;
  };
  status: string;
}
