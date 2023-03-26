import * as constants from "./constant.js";
import * as elements from "./elements.js";

// to update the personal code in the UI
export const updatePersonalCode = (socketID) => {
  const personalCode = document.getElementById("personal-code");
  personalCode.innerHTML = socketID;
};

// to show the incoming call dialog
export const showIncomingCallDialog = (
  callType,
  acceptCallHandler,
  rejectCallHandler
) => {
  const callTypeInfo =
    callType === constants.callType.Chat_Personal_Code ? "Chat" : "Video";

    const incomingCallDialog = elements.getIncomingCallDialog();
};
