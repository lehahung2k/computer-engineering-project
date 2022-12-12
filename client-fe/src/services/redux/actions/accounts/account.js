export const selectAccountForPocAction = (username) => {
  return {
    type: "ACCOUNT/SELECT_ACCOUNT_FOR_POC",
    payload: username,
  };
};

export const resetApiState = () => {
  return {
    type: "ACCOUNT/RESET_API_STATE",
  };
};

export const resetState = () => {
  return {
    type: "ACCOUNT/RESET_STATE",
  };
};
