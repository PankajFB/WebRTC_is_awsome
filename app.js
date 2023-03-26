const express = require("express");
const http = require("http");

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
// now we can use socket.io with our server
const io = require("socket.io")(server);

// middleware to make the public folder accessible from the outside world
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "public/index.html");
});

// this aray will hold the connected users
let connectedUsers = [];

// this is to insure that the socket is connected to the server form the server side
io.on("connection", (socket) => {
  console.log("New client connected");
  console.log(socket.id);
  connectedUsers.push(socket.id);

  // handling the pre-offer that we recived from the client
  socket.on("pre-offer", (data) => {
    console.log("pre-offer came from the caller");
    console.log(data);
    // we will store the data in in the variables
    const { callType, personalCode } = data;

    // look for the personal code in the connected users array
    // remeember not to use the { } in this arrow function it does not work
    const isUserExist = connectedUsers.find((id) => id === personalCode);
    

    // if the user exist then we will send the pre-offer to the target reciver
    if (isUserExist) {
      const data2 = {
        callerSocketID: socket.id,
        callType: callType,
      };

      console.log("request sent to callee");
      socket.to(personalCode).emit("pre-offer", data2);
      
    }
    else{
        console.log("user not found");
    }
  });

 
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
