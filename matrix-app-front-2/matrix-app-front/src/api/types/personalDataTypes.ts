export interface StartPersonalDataProps {
  code: string;
  message: string;
}

export interface AddressDataProps {
  department: string;
  province: string;
  district: string;
  address: string;
}

export interface SaveAddressProps {
  code: string;
  message: string;
}

export interface DeleteContactDataProps {
  message: string;
}

export interface WorkDataProps {
  occupation: string;
  jobProfession: string;
  laborsCenter: string;
  livesInPeru: boolean;
  extraFunctions: boolean;
  extraFunctionsOrganizationName?: string;
  extraFunctionsPosition?: string;
}

export interface SaveWorkProps {
  code: string;
  message: string;
}
