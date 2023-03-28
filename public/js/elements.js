export const getIncomingCallDialog = (
  callTypeInfo,
  acceptCallHandler,
  rejectCallHandler
) => {
  console.log("call is coming");

  const box = document.getElementById("incomingDialogBox");

  // remove the display_none class from the incomingDialogBox

  if (!box.classList.remove("display_none")) {
    console.log("class remoevd");
    const acceptCallButton = document.getElementById("acceptCallButton");
    const rejectCallButton = document.getElementById("rejectCallButton");
   
    try {
        acceptCallButton.addEventListener("click", acceptCallHandler);
    } catch (error) {
        console.log(error);
    }


  } else {
    console.log("class not removed");
  }
};

export const getCallDialog = (callTypeInfo, callingDialogRejectCallHandler) => {
  console.log("call is outgoing");

  const box = document.getElementById("callDialogBox");

  // remove the display_none class from the incomingDialogBox

  if (box.classList.remove("display_none")) {
    console.log("class remoevd");
  }
};
