export const resetApiState = () => {
  return {
    type: "TRANSACTION/RESET_API_STATE",
  };
};

export const setTransactionInfo = (transactionInfo) => {
  return {
    type: "TRANSACTION/SET_TRANSACTION_INFO",
    payload: transactionInfo,
  };
};
