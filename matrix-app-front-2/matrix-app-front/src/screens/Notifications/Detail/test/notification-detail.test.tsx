import NotificationDetail from "../NotificationDetail";
import { render } from "jest/test-utils";
import { ThemeProvider } from "@shopify/restyle";
import { rebrandingTheme } from "matrix-ui-components";


const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  dispatch: jest.fn(),
  reset: jest.fn(),
};

const route = {
  params: {
    "item": {
      "createdAt": "2023-11-15T16:29:32.319Z",
      "description": "¡Nuevo método de pago añadido! Hemos guardado con éxito la tarjeta de débito que termina en 1118. A partir de ahora, estará disponible para los pagos de tu tarjeta iO.",
    }
  },
  key: '',
  name: ''
}

describe('NotificationDetail component', () => {
  it('displays NotificationDetail with correct data', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <NotificationDetail 
          navigation={mockNavigation} 
          route={route} 
        />
      </ThemeProvider>
    );

    const containerDetail = getByTestId('container-detail');
    expect(containerDetail).toBeTruthy();

    const notificationDescription = getByTestId('notification-description');
    expect(notificationDescription).toBeTruthy();

    const notificationDate = getByTestId('notification-date');
    expect(notificationDate).toBeTruthy();

  });

})



