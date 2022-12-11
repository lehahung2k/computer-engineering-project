export const NewNamePocAction = (name) => {
  return {
    type: "POC/NEW_NAME",
    payload: name,
  };
};

export const NewCodePocAction = (code) => {
  return {
    type: "POC/NEW_CODE",
    payload: code,
  };
};

export const NewAccountAction = (account) => {
  return {
    type: "POC/NEW_ACCOUNT",
    payload: account,
  };
};

export const NewPocEventCodeAction = (eventCode) => {
  return {
    type: "POC/NEW_EVENT_CODE",
    payload: eventCode,
  };
};

export const NewNotePocAction = (note) => {
  return {
    type: "POC/NEW_NOTE",
    payload: note,
  };
};

export const NewPocAction = (event) => {
  return {
    type: "POC/NEW_POC",
    payload: event,
  };
};

export const AddNewPocAction = (poc) => {
  return {
    type: "POC/ADD_POC",
    payload: poc,
  };
};

export const resetState = () => {
  return {
    type: "POC/RESET_STATE",
  };
};
