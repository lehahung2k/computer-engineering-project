export const newNameEventAction = (name) => {
  return {
    type: "EVENT/NEW_NAME",
    payload: name,
  };
};

export const newCodeEventAction = (code) => {
  return {
    type: "EVENT/NEW_CODE",
    payload: code,
  };
};

export const newStartEventAction = (start) => {
  return {
    type: "EVENT/NEW_START",
    payload: start,
  };
};

export const newEndEventAction = (end) => {
  return {
    type: "EVENT/NEW_END",
    payload: end,
  };
};

export const newNoteEventAction = (note) => {
  return {
    type: "EVENT/NEW_NOTE",
    payload: note,
  };
};

export const newMapEventAction = (map) => {
  return {
    type: "EVENT/NEW_MAP",
    payload: map,
  };
};

export const newEventAction = (event) => {
  return {
    type: "EVENT/NEW_EVENT",
    payload: event,
  };
};
