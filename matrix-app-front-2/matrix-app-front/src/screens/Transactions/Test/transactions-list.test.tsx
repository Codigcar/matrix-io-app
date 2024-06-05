import { render, screen, waitFor } from "jest/test-utils";
import { ThemeProvider } from "@shopify/restyle";
import { rebrandingTheme } from "matrix-ui-components";
import { verifyTransactionMethod , TransactionsScreen} from "../List/screens/Transactions";
import { TransactionProps } from "src/api/types/TransactionTypes";


jest.mock('src/api/TransactionServices', () => ({
  getTransactions: jest.fn().mockResolvedValue(
    {
      data: 
      [ { date: '2023-11-21',
        items: 
          [ 
            { id: 'F30',
              description: 'Pago de Tarjeta iO',
              type: 'DepositPayments',
              account: '79824d82-309c-483d-9e14-93582d3b2',
              alias: '8470',
              cardReference: '525009226893',
              byDigitalWallet: true,
              totalAmount: 
              { value: '2.00',
                currencyCode: 'PEN',
                symbol: 'S/',
                sign: 'POSITIVE',
                formatted: '+S/2.00' },
              mcc: '0',
              acceptorNameAndLocation: 'Pago de Tarjeta iO',
              date: '2023-11-21',
              status: 'BILLED',
              time: '17:57',
              processingDate: '2023-11-21',
              operationAccountType: 'virtual' 
            } 
          ] 
        }
      ]
    }
  ),
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

const TransactionListRender = () => {
  return render(
    <ThemeProvider theme={rebrandingTheme}>
      <TransactionsScreen navigation={mockNavigation} route={route} />
    </ThemeProvider>
  );
}

const trs: TransactionProps = {
  "acceptorNameAndLocation": "Matrix TEST 1 PER", "alias": "8470","maskedCardNumber": "***4",
  "byDigitalWallet": true, "cardReference": "525009226893", "date": "2023-11-14", "description": "Compras",
  "id": "F2603122", "mcc": "","operationAccountType": "virtual", "processingDate": "2023-11-14", "status": "BILLED", 
  "time": "08:47", "totalAmount": {"value": -5.00,"currencyCode": "PEN", "formatted": "-S/5.00", "sign": "NEGATIVE"},
  "type": "PurchaseTrans"
}

describe('TransactionList component', () => {

  it('displays list Transactions with correct data',async () => {
    TransactionListRender();
    await waitFor(()=>{
      expect(screen.getByTestId('transaction-list')).toBeVisible();
    });
  });

  it('displays active filters',async () => {
    TransactionListRender();
    await waitFor(()=>{
      expect(screen.getByTestId('active-filters-transactions')).toBeVisible();
    });
  });

  it('should return Virtual if operationAccountType is virtual', () => {
    const responseVirtual = verifyTransactionMethod({...trs,"operationAccountType": "virtual"});
    expect(responseVirtual).toBe('Virtual');
  });

  it('should return Presencial if operationAccountType is Standard ', () => {
    const responseStandard = verifyTransactionMethod({...trs,"operationAccountType": "standard"});
    expect(responseStandard).toBe('Presencial');
  });

  it('should return empty if operationAccountType is other type', () => {
    const responseOtherType = verifyTransactionMethod({...trs,"operationAccountType": ''});
    expect(responseOtherType).toBe('');
  });

});

