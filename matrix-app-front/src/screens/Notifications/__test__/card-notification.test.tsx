import CardNotification from "../components/CardNotification";
import { fireEvent, render } from "jest/test-utils";
import { ThemeProvider } from "@shopify/restyle";
import { rebrandingTheme } from "matrix-ui-components";

const navigationToDetailMock = jest.fn();

const cardNotificationRender = () => {
  return render(
    <ThemeProvider theme={rebrandingTheme}>
      <CardNotification
        testID="card-notification"
        title={""} date={""} 
        isRead={false} onPress={()=>navigationToDetailMock()} 
        onRemovePress={jest.fn()} 
      />
    </ThemeProvider>
  )
}

describe('CardNotification component', () => {
  it('displays CardNotification with correct data', () => {
    const { getByTestId } = cardNotificationRender();

    const seeMore = getByTestId('see-more-notification');
    expect(seeMore).toBeTruthy();

    const notificationDateCard = getByTestId('notification-date');
    expect(notificationDateCard).toBeTruthy();
    
  });

  it('should navigate to NotificationDetail screen on press', () => {

    const { getByTestId } = cardNotificationRender();
    fireEvent.press(getByTestId('card-notification'));
    expect(navigationToDetailMock).toHaveBeenCalledTimes(1);
  });
});