export const NewNamePocAction = (name) => {
  return {
    type: "NEW_NAME",
    payload: name,
  };
};

export const NewCodePocAction = (code) => {
  return {
    type: "NEW_CODE",
    payload: code,
  };
};

export const NewAccountAction = (account) => {
  return {
    type: "NEW_ACCOUNT",
    payload: account,
  };
};

export const NewPocEventCodeAction = (eventCode) => {
  return {
    type: "NEW_EVENT_CODE",
    payload: eventCode,
  };
};

export const NewNotePocAction = (note) => {
  return {
    type: "NEW_NOTE",
    payload: note,
  };
};

export const NewPocAction = (event) => {
  return {
    type: "NEW_POC",
    payload: event,
  };
};

export const AddNewPocAction = (poc) => {
  return {
    type: "ADD_POC",
    payload: poc,
  };
};
