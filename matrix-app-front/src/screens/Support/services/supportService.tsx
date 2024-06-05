import { API_KEY } from 'src/utils/constants';
import { SupportApi } from 'src/api';

interface Body {
  email: string;
  dni: string;
  name: string;
  lastname: string;
  phone: string;
  gRecaptchaToken: string;
}

const SupportServices = {
  createTicketSupport: (googleToken: string, data: Body) => {
    const createTicketSupportURL = '/v1/tickets';
    return SupportApi.post(createTicketSupportURL, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        authorizationToken: googleToken,
      },
    });
  },
};

export default SupportServices;
