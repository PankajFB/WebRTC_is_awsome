export const getIncomingCallDialog = () => {
    console.log("call is coming");
    
const box = document.getElementById("incomingDialogBox");

// remove the display_none class from the incomingDialogBox


if(!box.classList.remove("display_none")){
    console.log("class remoevd");
}
else{
    console.log("class not removed");
};

};


export const getCallDialog = (callTypeInfo, rejectCallHandler) => {
    console.log("call is coming");

const box = document.getElementById("callDialogBox");

// remove the display_none class from the incomingDialogBox


if(box.classList.remove("display_none")){
    console.log("class remoevd");
}
};
    