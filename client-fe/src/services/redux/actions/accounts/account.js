export const selectAccountForPocAction = (username) => {
  return {
    type: "ACCOUNT/SELECT_ACCOUNT_FOR_POC",
    payload: username,
  };
};
