export const INITIAL_STORE_MOCK = {
  auth: {
    requestCode: {
      data: [],
      error: '',
      isLoading: false,
    },
    forgotPassword: {
      data: [],
      error: '',
      isLoading: false,
    },
    signIn: {
      token: 'test',
    },
  },
  welcome: {
    sliderHasBeenSeen: false,
    giftHasBeenSeen: false,
  },
  account: {
    balance: {
      isLoading: false,
      getReqBalanceSuccess: [],
      getReqBalanceError: null,
    },
    order: {
      isLoading: false,
      getReqOrdersSuccess: [],
      getReqOrdersError: null,
    },
    payment: {
      isLoading: false,
      getReqPaymentSuccess: [],
      getReqPaymentError: null,
      paymentIsLoading: false,
      paymentCardSuccess: {},
      paymentCardError: {},
    },
  },
  session: {
    token: null,
    user: {
      alias: '',
      name: '',
      lastName: '',
      fullName: '',
      documentNumber: '',
      phoneNumber: '',
      address: '',
      province: '',
      district: '',
      state: '',
      email: '',
      location: {},
      isEmailVerified: false,
      accountId: '',
    },
    isError: false,
    isLoading: false,
  },
};

export const PROPS_MOCK = {
  navigation: {
    navigate: jest.fn((path: string) => path),
  },
  route: {
    key: 'Mslys76S06KBxVC7okTce',
    name: 'OfferDetails',
  },
};

export const insets = {
  frame: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  },
  insets: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
};
