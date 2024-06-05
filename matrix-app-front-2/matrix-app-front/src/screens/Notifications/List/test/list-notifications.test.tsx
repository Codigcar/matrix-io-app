import { render, screen, waitFor } from "jest/test-utils";
import { ThemeProvider } from "@shopify/restyle";
import { rebrandingTheme } from "matrix-ui-components";
import ListNotifications from "../ListNotifications";

jest.mock('aws-amplify', () => ({
  graphqlOperation: jest.fn(()=>({
    subscribe: jest.fn(()=>({
      next:  jest.fn(),
      error: jest.fn()
    }))
  })),
  API: {
    graphql: jest.fn(() => ({
      subscribe: jest.fn(()=>({
        unsubscribe: jest.fn()
      })),
      data:{
        listNotifications: {
          nextToken:"b89j-oVzuRwhkuFDpKfq6YRlQz3G8nLm6/P8ymMzRwSjpLC6q5x",
          items:[
            {
              "createdAt": "2023-11-15T17:07:12.407Z", 
              "description": "¡Pago exitoso! Pagaste el monto de S/3 con una tarjeta de débito.",
              "id": "fafa33a1-a0a3-43bc-b186-bdd41343bd44",
              "isRead": false,
              "title": "", 
              "user": "2d0cb386-5fd8-4c46-b764-1a6d8844ad18"
            },
          ]
        },
      }
    }))
  }
}));

jest.mock('../../graphql/schema', () => ({
  listNotifications: jest.fn()
}));

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  dispatch: jest.fn(),
  reset: jest.fn(),
};

const route = {
  params: undefined,
  key: '',
  name: ''
}

const listNotificationsRender = async() => {
  return render(
    <ThemeProvider theme={rebrandingTheme}>
      <ListNotifications navigation={mockNavigation} route={route} />
    </ThemeProvider>
  )
}

describe('CardNotification component', () => {

  it('displays CardNotification with correct data',async () => {
    listNotificationsRender();
    await waitFor(()=>{
      expect(screen.getByTestId('list-notifications')).toBeVisible();
    });
  });

});
