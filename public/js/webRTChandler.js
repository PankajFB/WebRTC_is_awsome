import * as wss from "./wss.js";
import * as constants from "./constant.js";
import * as ui from "./ui.js";



// array to store the connected users
let connectedUsers = {};

export const sendPreOffer = (callType, personalCode) => {

  connectedUsers = {
    callType: callType,
    socketId: personalCode,

  };

  if (callType === constants.callType.Chat_Personal_Code || callType === constants.callType.Video_Personal_Code) {


    const data = {
      callType: callType,
      personalCode: personalCode,
    };
  
    console.log(data);
  
  //   sending the pre-offer to the server using the sendPreOffer function from wss.js
    wss.sendPreOffer(data);


    ui.showCallDialog(callType,rejectCallHandler);
  } else {
    console.log("call type not found while calling");
  }

  
};

export const handlePreOffer = (data) => {
    console.log("we got the pre-offer from the server 😋")
    console.log(data);
    const {callType, personalCode} = data;

    connectedUsers = {
      personalCode : personalCode,
      calltype : callType
    }

    console.log(callType)

    if(callType === constants.callType.Chat_Personal_Code || callType === constants.callType.Video_Personal_Code){
      ui.showIncomingCallDialog(callType, acceptCallHandler, rejectCallHandler);

    }else{
      console.log("call type not found");
    }
};

const acceptCallHandler = () => {
  console.log("call accepted");
  console.log(connectedUsers);
};

const rejectCallHandler = () => {
  console.log("call rejected");
};


