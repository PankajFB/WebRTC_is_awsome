import * as store from "./store.js";
import * as ui from "./ui.js";
import * as webRTChandler from "./webRTChandler.js";

let socketIO = null;

export const registerSocket = (socket) => {
  // to set the socket in the store variable
  socketIO = socket;

  // this is to insure that the socket is connected to the server form the client side
  socket.on("connect", () => {
    console.log("successfully connected to socket server");
    console.log(socket.id);

    // to set the socket id in the store state
    store.setSocketID(socket.id);
    console.log(store.getState());

    // to update the ui or personal code
    ui.updatePersonalCode(socket.id);
  });

  // handling the pre-offer that we recived from the server
  socket.on("pre-offer", (data) => {
    console.log("pre-offer came from the server");
    console.log(data);
    webRTChandler.handlePreOffer(data);
  });

  socket.on("pre-offer-answer", (data) => {
    console.log("pre-offer-answer came from the server to the caller side hureee its working");
    console.log(data);
    webRTChandler.handlePreOfferAnswer(data);
  });
};

// to send the pre-offer to the server
export const sendPreOffer = (data) => {
  console.log(data);
  socketIO.emit("pre-offer", data);
};

// to send the pre-offer-answer to the server
export const sendPreOfferAnswer = (data) => {
  console.log("sending pre-offer-answer from the callee to the server ");
  console.log(data);
  socketIO.emit("pre-offer-answer", data);
};
