export const newNameEventAction = (name) => {
  return {
    type: "NEW_NAME",
    payload: name,
  };
};

export const newCodeEventAction = (code) => {
  return {
    type: "NEW_CODE",
    payload: code,
  };
};

export const newStartEventAction = (start) => {
  return {
    type: "NEW_START",
    payload: start,
  };
};

export const newEndEventAction = (end) => {
  return {
    type: "NEW_END",
    payload: end,
  };
};

export const newNoteEventAction = (note) => {
  return {
    type: "NEW_NOTE",
    payload: note,
  };
};

export const newMapEventAction = (map) => {
  return {
    type: "NEW_MAP",
    payload: map,
  };
};

export const newEventAction = (event) => {
  return {
    type: "NEW_EVENT",
    payload: event,
  };
};
