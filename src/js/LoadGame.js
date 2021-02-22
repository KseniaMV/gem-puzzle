export default class LoadGame{
    constructor(){
        this.buttonYes = null;
        this.buttonNo = null;
        this.popup = null;
    }

    checkDataInLocalStorage(){
        if(localStorage.getItem("gemPuzzle") !== null){
            return JSON.parse(localStorage.getItem("gemPuzzle"));
        }else{
            return null;
        }
    };

    createLoadPopup(){
        let popup = document.createElement("div");
            popup.classList.add("popup");
            document.body.append(popup);
        let text = document.createElement("p");
            text.innerHTML = "There is a saved game, do you want to load it?";
            popup.append(text);
        let buttonYes = document.createElement("button");
            buttonYes.classList.add("popup-button");
            buttonYes.innerText = "Yes";
            popup.append(buttonYes);
        let buttonNo = document.createElement("button");
            buttonNo.classList.add("popup-button");
            buttonNo.innerText = "No";
            popup.append(buttonNo);

            this.buttonNo = buttonNo;
            this.buttonYes = buttonYes;
            this.popup = popup;
    }
    createLoadButton(){
        let buttonLoad = document.createElement("button");
            buttonLoad.classList.add("game-button", "popup-button");
            buttonLoad.innerText = "Saved game";
            return buttonLoad;
    }

}




