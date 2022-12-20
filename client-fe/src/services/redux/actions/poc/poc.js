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

export const NewPocAction = (poc) => {
  return {
    type: "POC/NEW_POC",
    payload: poc,
  };
};

export const AddNewPocAction = (poc) => {
  return {
    type: "POC/ADD_POC",
    payload: poc,
  };
};

export const NewListPocAction = (listPoc) => {
  return {
    type: "POC/NEW_LIST_POC",
    payload: listPoc,
  };
};

export const RemovePocAction = (pointCode) => {
  return { type: "POC/REMOVE_POC", payload: pointCode };
};

export const UpdatePocAction = (poc, field) => {
  return {
    type: "POC/UPDATE_POC",
    payload: { poc: poc, field: field },
  };
};

export const resetApiState = () => {
  return {
    type: "POC/RESET_API_STATE",
  };
};

export const resetState = () => {
  return {
    type: "POC/RESET_STATE",
  };
};
