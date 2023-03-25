// this state object it used to store all the states which we will later use in our application
let state = {
  socketID: null,
  localStream: null,
  remoteStream: null,
  screenSharingStream: null,
  allowConnectionsFromStrangers: false,
  screenSharingActive: false,
};


// from here we will export all the functions which will be used to update the state object
export const setSocketID = (socketID) => {
  state = {
    ...state,
    socketID: socketID,
  };
};

export const setLocalStream = (stream) => {
  state = {
    ...state,
    localStream: stream,
  };
};

export const setremoteStream = (stream) => {
  state = {
    ...state,
    remoteStream: stream,
  };
};

export const setscreenSharingStream = (stream) => {
  state = {
    ...state,
    screenSharingStream: stream,
  };
};

export const setallowConnectionsFromStrangers = (allowConnectionsFromStrangers) => {
  state = {
    ...state,
    allowConnectionsFromStrangers:allowConnectionsFromStrangers,
  };
};

export const setscreenSharingActive = ( screenSharingActive) => {
  state = {
    ...state,
    screenSharingActive:  screenSharingActive,
  };
};

export const getState = () => state;
