// SignIn
export const signInDataSelector = (state: any) => state.auth.signIn?.token;
export const signInAccountSelector = (state: any) => state.session.user?.accountId;
export const signInIsLoadingSelector = (state: any) => state.auth.signIn?.isLoading;
export const signInErrorSelector = (state: any) => state.auth.signIn?.error;
export const signInUserDataSelector = (state: any) => state.auth.signIn?.userData;
export const signInCardOfferSelector = (state: any) => state.auth.signIn?.cardOffer;
export const signInUserNameCognitoSelector = (state: any) => state.auth.signIn?.cognitoUserName;
export const signInBlockUserAccountSelector = (state: any) => state.auth.signIn?.blockUserAccount;
