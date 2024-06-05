export const cardPaymentSelector = (state: any) => state?.payment?.cardPayment;
export const paymentMethodsSelector = (state: any) => state?.account?.payment?.getReqPaymentSuccess;
export const loadingPaymentMethodsSelector = (state: any) => state?.account?.payment?.isLoading;
export const accountIDSelector = (state: any) => state?.session?.user?.accountId;
export const signInEmailSelector = (state: any) => state.auth.signIn?.email;
