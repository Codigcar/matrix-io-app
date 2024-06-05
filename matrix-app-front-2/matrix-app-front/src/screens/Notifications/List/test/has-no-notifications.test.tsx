import HasNoNotifications from "../components/HasNoNotifications";
import { render } from "jest/test-utils";
import { ThemeProvider } from "@shopify/restyle";
import { rebrandingTheme } from "matrix-ui-components";

const hasNoNotificationsRender = () => {
  return render(
    <ThemeProvider theme={rebrandingTheme}>
      <HasNoNotifications/>
    </ThemeProvider>
  );
}

describe('HasNoNotifications component', () => {
  it('should render without errors', () => {
    const { getByTestId } = hasNoNotificationsRender();
    const component = getByTestId('has-no-notifications');
    expect(component).toBeTruthy();
  });
});