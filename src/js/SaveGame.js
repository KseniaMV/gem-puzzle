export default class SaveGame{
    constructor(gameField, time, stepCount, itemCount){
        this.gameField = gameField;
        this.time = time;
        this.stepCount = stepCount;
        this.itemCount = itemCount;

    }

    setDataToLocalStorage(){
        localStorage.clear();
        let numbers = [];
            this.gameField.forEach(element => {
                numbers.push(element.dataset.number);
    
            });
        let savedGame = {
            gameField : numbers,
            time : this.time,
            step : this.stepCount,
            itemCount : this.itemCount
        }
        localStorage.setItem("gemPuzzle", JSON.stringify(savedGame));

    }

    createPopup(string){
        let popup = document.createElement("div");
            popup.classList.add("popup");
            document.body.append(popup);
        let text = document.createElement("p");
            text.innerText = string;
            popup.append(text);
        return popup;
    }

    createSaveButton(){
        let buttonYes = document.createElement("button");
            buttonYes.classList.add("popup-button");
            buttonYes.innerText = "Yes";
            return buttonYes;
    }

    createRejectButton(){
        let buttonNo = document.createElement("button");
            buttonNo.classList.add("popup-button");
            buttonNo.innerText = "No";
            return buttonNo; 
    }

}