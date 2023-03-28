import * as wss from "./wss.js";
import * as constants from "./constant.js";
import * as ui from "./ui.js";

// array to store the connected users
let connectedUsers_for_sendPreOffer = {};

let connectedUsers_for_handlePreOffer = {};

export const sendPreOffer = (callType, personalCode) => {
  connectedUsers_for_sendPreOffer = {
    callType: callType,
    socketId: personalCode,
  };

  if (
    callType === constants.callType.Chat_Personal_Code ||
    callType === constants.callType.Video_Personal_Code
  ) {
    const data = {
      callType: callType,
      personalCode: personalCode,
    };

    console.log(data);

    //   sending the pre-offer to the server using the sendPreOffer function from wss.js
    wss.sendPreOffer(data);

    ui.showCallDialog(callType, callingDialogRejectCallHandler);
  } else {
    console.log("call type not found while calling");
  }
};

export const handlePreOffer = (data) => {
  console.log("we got the pre-offer from the server 😋");
  console.log(data);
  const { callerSocketID, callType } = data;

  console.log(callerSocketID);
  console.log(callType);

  connectedUsers_for_handlePreOffer = {
    calltype: callType,
    callerSocketId: callerSocketID,
  };

  console.log(connectedUsers_for_handlePreOffer);
  console.log(callType);

  if (
    callType === constants.callType.Chat_Personal_Code ||
    callType === constants.callType.Video_Personal_Code
  ) {
    ui.showIncomingCallDialog(callType, acceptCallHandler, rejectCallHandler);
  } else {
    console.log("call type not found");
  }
};

// now we gonna handle the the pre-offer answer from the server
export const handlePreOfferAnswer = (data) => {
  console.log("we got the pre-offer-answer from the server 😋");
  console.log(data.data);
  console.log(data.data.answerType);
  console.log(constants.preOfferAnswer.Call_Accepted);
  const answerType = data.data.answerType;

  // to remove the dialog box on getting the answer from the callee
  ui.removeDialog();

  if (answerType === constants.preOfferAnswer.Call_Accepted) {
    // to show dialog that the call is accepted
    console.log("call accepted");
  } else if (answerType === constants.preOfferAnswer.Call_Rejected) {
    // to show dialog that the call is rejected
    console.log("call rejected");
  } else if (answerType === constants.preOfferAnswer.Call_Busy) {
    // to show a dialog that the callee is busy
    console.log("call busy");
  } else {
    // to show a dialog that the callee is not available
    console.log("call type not found");
  }
};

const acceptCallHandler = () => {
  console.log("call accepted");
  try {
    sendPreOfferAnswer(constants.preOfferAnswer.Call_Accepted);
    ui.removeDialog();
  } catch (error) {
    console.log(error);
  }
};

const rejectCallHandler = () => {
  console.log("call rejected");
};

const callingDialogRejectCallHandler = () => {
  console.log("call rejected");
};

const sendPreOfferAnswer = (answerType) => {
  const { callType, personalCode } = connectedUsers_for_handlePreOffer;

  const data = {
    answerType: answerType,
    callerSocketId: connectedUsers_for_handlePreOffer.callerSocketId,
  };

  wss.sendPreOfferAnswer(data);
};
