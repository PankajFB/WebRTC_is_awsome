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
    webRTChandler.handlePreOffer(data);
  });

};


// to send the pre-offer to the server
export const sendPreOffer = (data) => {
  socketIO.emit("pre-offer", data);
};
