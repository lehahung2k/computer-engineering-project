export const newNameEvent = (name) => {
  return {
    type: "NEW_NAME",
    payload: name,
  };
};

export const newCodeEvent = (code) => {
  return {
    type: "NEW_CODE",
    payload: code,
  };
};

export const newStartEvent = (start) => {
  return {
    type: "NEW_START",
    payload: start,
  };
};

export const newEndEvent = (end) => {
  return {
    type: "NEW_END",
    payload: end,
  };
};

export const newNoteEvent = (note) => {
  return {
    type: "NEW_NOTE",
    payload: note,
  };
};

export const newMapEvent = (map) => {
  return {
    type: "NEW_MAP",
    payload: map,
  };
};

export const newEvent = (event) => {
  return {
    type: "NEW_EVENT",
    payload: event,
  };
};
