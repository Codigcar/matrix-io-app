import Card from './Card';
import { render } from 'jest/test-utils';
import { ThemeProvider } from '@shopify/restyle';
import { rebrandingTheme } from 'matrix-ui-components';

const transactionsListRender = () => {
  return render(
    <ThemeProvider theme={rebrandingTheme}>
      <Card testID={'transactions-card'} transactionType={'DepositPayments'} transactionStatus={'BILLED'} 
        transactionMethod={'virtual'} description={'Pago de Tarjeta'} amountTotalTransaction={'+S/50.20'} sign={'POSITIVE'} onPress={function (): void {
        throw new Error('Function not implemented.');
      } } />
    </ThemeProvider>
  
  );
}

describe('Transactions component', () => {
  it('should render without errors', () => {
    const { getByTestId } = transactionsListRender();
    const component = getByTestId('transactions-card');
    expect(component).toBeTruthy();
  })
});

