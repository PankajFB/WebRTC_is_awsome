// to update the personal code in the UI
export const updatePersonalCode = (socketID) => {
    const personalCode = document.getElementById("personal-code");
    personalCode.innerHTML = socketID;
    }
//