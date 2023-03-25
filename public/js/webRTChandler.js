import * as wss from "./wss.js";

export const sendPreOffer = (callType, personalCode) => {
  const data = {
    calltype: callType,
    personalCode: personalCode,
  };

//   sending the pre-offer to the server using the sendPreOffer function from wss.js
  wss.sendPreOffer(data);
};

export const handlePreOffer = (data) => {
    console.log("we got the pre-offer from the server 😋")
    console.log(data);
    };

