import * as wss from "./wss.js";
import * as constants from "./constant.js";
import * as ui from "./ui.js";

// array to store the connected users
let connectedUsers_for_sendPreOffer = {};

let connectedUsers_for_handlePreOffer = {};

let PeerConnection;

let socketIdTemp;

// configuration for the peer connection
const configuration = {
  iceServers: [
    {
      // we will use the google stun server to get our ice candidates
      urls: "stun:stun.l.google.com:19302",
    },
  ],
};

// setup the local media stream
export const updateLocalVideoPreview = () => {
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: true,
    })
    .then(
      (stream) => {
        ui.updateLocalVideo(stream);
      },
      (error) => {
        console.log("not able to get the media access");
        console.log(error);
      }
    );
};

//function to creat the peer connection
const createPeerConnection = () => {
  PeerConnection = new RTCPeerConnection(configuration);
  console.log("creating the peer connection");
  console.log(PeerConnection);
  // to handle the ice candidates
  PeerConnection.onicecandidate = (event) => {
    console.log("we are getting ice candidate from the stun server");
    console.log(event);
    if (event.candidate) {
      // sending the ice candidate to the server
      wss.sendIceCandidate(event.candidate);
    } else {
      console.log("no ice candidate found");
    }

    // to handle the ice candidate error
    PeerConnection.onicecandidateerror = (event) => {
      console.log("error in getting the ice candidate");
      console.log(event);
    };

    // to handle the ice connection state change
    PeerConnection.oniceconnectionstatechange = (event) => {
      if (PeerConnection.connectionState === "connected") {
        console.log("Successfully connectd to the peer");
      }
    };

    // recieve track from the peer
    const remoteStream = new MediaStream();
    store.setRemoteStream(remoteStream);
    ui.updateRemoteVideo(remoteStream);

    PeerConnection.ontrack = (event) => {
      console.log("track received from the peer");
      console.log(event);
      remoteStream.addTrack(event.track);
    };

    // add our stream to the peer connection

    if (
      connectedUsers_for_sendPreOffer.callType ===
      constants.callType.Video_Personal_Code
    ) {
      const localStream = store.getLocalStream();
      localStream.getTracks().forEach((track) => {
        PeerConnection.addTrack(track, localStream);
      });
    }
  };
};

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

  console.log(connectedUsers_for_handlePreOffer.callerSocketId);
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
  console.log(data.data.callerSocketId);
  // just to store the socket id for this js file
  socketIdTemp = data.data.callerSocketId;

  console.log(data.data.answerType);
  console.log(constants.preOfferAnswer.Call_Accepted);
  const answerType = data.data.answerType;

  // to remove the dialog box on getting the answer from the callee
  ui.removeDialog();

  if (answerType === constants.preOfferAnswer.Call_Accepted) {
    // to show dialog that the call is accepted
    console.log("call accepted");

    // create the peer connection
    createPeerConnection();

    // send webRTC signal to the callee
    sendWebRTCOffer();
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
  createPeerConnection();
};

const rejectCallHandler = () => {
  console.log("call rejected");
  try {
    sendPreOfferAnswer(constants.preOfferAnswer.Call_Rejected);
    ui.removeDialog();
  } catch (error) {
    console.log(error);
  }
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

const sendWebRTCOffer = async () => {
  const offer = await PeerConnection.createOffer();
  await PeerConnection.setLocalDescription(offer);
  console.log(socketIdTemp);

  wss.sendDataUsingWebRTCSignaling({
    connectedUserSocketId: socketIdTemp,
    type: constants.webRTCSignaling.Offer,
    offer: offer,
  });
};

export const handleWebRTCSignaling = async (data) => {
  console.log(
    "we got the webRTC signaling from the server 😋 i am in the webRTC signaling handler"
  );
  console.log(data);
  await PeerConnection.setRemoteDescription(data);
  const answer = await PeerConnection.createAnswer();
  await PeerConnection.setLocalDescription(answer);
  console.log(answer)
  wss.sendDataUsingWebRTCSignaling({
    connectedUserSocketId: socketIdTemp,
    type: constants.webRTCSignaling.Answer,
    answer: answer,
  });
  console.log("done");
};

export const handleWebRTCAnswer = async (data) => {
  console.log("we are getting the answer in the client");
  console.log(data);
  await PeerConnection.setRemoteDescription(data);
};