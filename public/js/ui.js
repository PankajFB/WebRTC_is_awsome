import * as constants from "./constant.js";
import * as elements from "./elements.js";

// to update the personal code in the UI
export const updatePersonalCode = (socketID) => {
  const personalCode = document.getElementById("personal-code");
  personalCode.innerHTML = socketID;
};

// to upadte the video preview
export const updateLocalVideo = (stream) => {
    const localVideo = document.getElementById("local-video");
    localVideo.srcObject = stream;
    // turn on the video stream when the meta data is loaded
    localVideo.addEventListener("loadedmetadata", () => {
        localVideo.play();
    });
};




// to show the incoming call dialog
export const showIncomingCallDialog = (
  callType,
  acceptCallHandler,
  rejectCallHandler
) => {
  const callTypeInfo =
    callType === constants.callType.Chat_Personal_Code ? "Chat" : "Video";

  elements.getIncomingCallDialog(
    callTypeInfo,
    acceptCallHandler,
    rejectCallHandler
  );
};

export const showCallDialog = (callType, callingDialogRejectCallHandler) => {
  const callTypeInfo =
    callType === constants.callType.Chat_Personal_Code ? "Chat" : "Video";

  elements.getCallDialog(callTypeInfo, callingDialogRejectCallHandler);
};

export const removeDialog = () => {
  const incomingDialogBox = document.getElementById("incomingDialogBox");
  const callDialogBox = document.getElementById("callDialogBox");

  if (!incomingDialogBox.classList.add("display_none")) {
    console.log("incoming dialog box removed");
  }else{
        console.log("incoming dialog box not removed");
  }

  if (!callDialogBox.classList.add("display_none")) {
    console.log("call dialog box removed");
  }
};
