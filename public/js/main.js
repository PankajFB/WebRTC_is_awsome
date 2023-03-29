import * as store from "./store.js";
import * as wss from "./wss.js";
import * as webRTChandler from "./webRTChandler.js";
import * as constants from "./constant.js";

// we passed the / in the io() function it iwll automatically insert the port on which the server is running
const socket = io("/");

webRTChandler.updateLocalVideoPreview();

// start the socket connection
wss.registerSocket(socket);

// register event for the personal code copy button
const copyPersonalCodeButton = document.getElementById("copy-personal-code");
copyPersonalCodeButton.addEventListener("click", () => {
  const personalCode = document.getElementById("personal-code");
  navigator.clipboard.writeText(personalCode.innerHTML);
});

// register events listners for the chat and video buttons
const chatButton = document.getElementById("chat-button");
const videoButton = document.getElementById("video-button");
chatButton.addEventListener("click", () => {
  console.log("chat button clicked");
  // get the personal code input from the input element
  const personal_code_input = document.getElementById("personal-code-input").value;

  // assigning the calltype to the user
  const callType = constants.callType.Chat_Personal_Code;
  console.log(personal_code_input);
  webRTChandler.sendPreOffer(callType, personal_code_input);
});
videoButton.addEventListener("click", () => {
  console.log("video button clicked");
   // get the personal code input from the input element
   const personal_code_input = document.getElementById("personal-code-input").value;

   // assigning the calltype to the user
   const callType = constants.callType.Video_Personal_Code;
   console.log(personal_code_input);
   webRTChandler.sendPreOffer(callType, personal_code_input);
});
