import './styles/style.css';
import ShuffleItems from './js/ShuffleItems';
import MoveItems from './js/MoveItems';
import SaveGame from './js/SaveGame';
import LoadGame from './js/LoadGame';
import Validation from './js/Validation';
import Win from './js/Win';

export default class GemPuzzle { 
    constructor(){
        this.itemCount = "4";           //field siae default == 4
        this.mainConteiner = null;
        this.puzzleConteiner = null;
        this.settingConteiner = null;
        this.puzzleItems = [];          //html elements
        this.select = null;             //element with setting options
        this.buttonPlay = null;         //buttons
        this.buttonSetting = null;      //open settings
        this.buttonRestart = null;      //restart game
        this.buttonEnd = null;          //end game
        this.buttonCount = null;        //set field size in setting 
        this.buttonLoad = null;         //load saved game
        this.soundButton = null;        //sound off or on      
        this.saveButton = null;         //save game 
        this.rejectButton = null;       //don't save game
        this.stepCountConteiner = null; //html element with step count
        this.step = 0;                  //steps count
        this.time = null;               //html element with current time
        this.gameTime = {               //game time
            hours: 0,
            minutes: 0,
            seconds: 0
        };
        this.sound = true;              
        this.loadGame = null;           //object with saved game
        this.popup = null;              //popup conteiner
        this.popupButtons = {
            yes: null,
            no : null
        }
        this.isLoadSavedGame = false;
    }

    init(){
        //create elements
        let mainConteiner = document.createElement("main");
        let title = document.createElement("h1");
        let buttonPlay = document.createElement("button");
        let settingButton = document.createElement("button");
        let soundButton = document.createElement("button");

        //add styles and attributes
        mainConteiner.classList.add("main-conteiner");
        title.classList.add('puzzle-title');
        buttonPlay.classList.add("game-button", "start-game-button");
        buttonPlay.setAttribute("type", "button");
        settingButton.classList.add("game-button", "setting-game-button");
        settingButton.setAttribute("type", "button");
        soundButton.classList.add("sound-button");

        //add item to consturtor
        this.mainConteiner = mainConteiner;
        this.buttonPlay = buttonPlay;
        this.buttonSetting = settingButton;
        this.soundButton = soundButton;
        //add text
        title.innerHTML = "Gem Puzzle";
        this.buttonSetting.innerHTML = "setting";
        this.buttonPlay.innerHTML = "play";
        this.soundButton.style.backgroundImage = "url(./assets/images/volume_off.svg)";

        //add elements to document
        document.body.append(this.mainConteiner);
        document.body.append(title);
        this.mainConteiner.append(buttonPlay);
        this.mainConteiner.append(settingButton);
        document.body.append(soundButton);

        //check localStorage
        this.loadSavedGame();

        this.buttonPlay.addEventListener("click", ()=>{
            this.isLoadSavedGame = false;
            this.clear();
            this.startGame();
        });
        this.openSetting();
        this.toggleSound();

    };

    startGame(){ 
        this.createGameField(this.itemCount);  
        this.replaceItems();                  
        this.setTime(); 
        this.setStepCount();
        this.toggleMainButtonHide();       
    };

    createFieldGrid(fieldCount){              
        if(fieldCount === "3"){
            return "small-field";
        }
        if(fieldCount === "4"){
            return("default-field");
        }
        if(fieldCount === "5"){
            return("middle-field");
        }
        if(fieldCount === "6"){
            return("middle-field-six");
        }
        if(fieldCount === "7"){
            return("big-field");
        }
        if(fieldCount === "8"){
            return("big-field-eight");
        }
    }

    createGameField(fieldCount){                  //create field with numbers
        let numbers = [];
        let gridClass = this.createFieldGrid(fieldCount);
        let puzzleConteiner = document.createElement("div");
            puzzleConteiner.classList.add("puzzle-conteiner","puzzle-show");
            puzzleConteiner.classList.add(gridClass);
            this.mainConteiner.append(puzzleConteiner);
            this.puzzleConteiner = puzzleConteiner;
            if(this.isLoadSavedGame === true){          //if there is a saved game load saved numbers
                numbers = this.loadGame.gameField;
            }
            if(this.isLoadSavedGame === false){         //else create new numbers
                let shuffle = new ShuffleItems(this.itemCount);
                numbers = shuffle.checkSolvability();
            }
        numbers.forEach(number => {
            let puzzleItem = document.createElement("div");
            puzzleItem.classList.add("puzzle-item");
            puzzleItem.setAttribute("data-number", number);
            puzzleItem.setAttribute("draggable", 'true');
            puzzleItem.innerText = number;
            puzzleConteiner.append(puzzleItem);
            this.puzzleItems.push(puzzleItem); 
            if(number === 0 || number === "0"){
                puzzleItem.innerText = ""; 
                puzzleItem.setAttribute("data-number", '0');
                puzzleItem.classList.remove("puzzle-item");
                puzzleItem.classList.add("empty");
                puzzleItem.setAttribute("draggable", 'false');
            } 
        });

        let time = document.createElement("p");
            time.classList.add("time");
            time.innerText = "Time: ";
            this.puzzleConteiner.append(time);
            this.time  = time;

        let stepCount = document.createElement("p");
            stepCount.classList.add("step-count");
            stepCount.innerText = "Step count: " + this.step;
            this.puzzleConteiner.append(stepCount);
            this.stepCountConteiner = stepCount;
            if(fieldCount > "5"){
                this.time.classList.toggle("time-position");
                this.stepCountConteiner.classList.toggle("step-count--position");
            }
        let restartButton = document.createElement("button");
            restartButton.classList.add("game-button", "restart-button");
            restartButton.innerText = "restart";
            this.mainConteiner.append(restartButton);
            this.buttonRestart = restartButton;
            this.restart();
        
        let buttonEnd = document.createElement("button");
            buttonEnd.classList.add("game-button", "end-button");
            buttonEnd.innerText = "end";
            this.mainConteiner.append(buttonEnd);
            this.buttonEnd = buttonEnd;
            this.end();
    };

    createSettingItem(){
        this.toggleMainButtonHide();
        if( this.settingConteiner!= null){
            document.querySelector(".setting-conteiner").remove();
            this.settingConteiner = null;
        };
        let settingConteiner = document.createElement("section");
            settingConteiner.classList.add("setting-conteiner");
            this.mainConteiner.append(settingConteiner);
            this.settingConteiner = settingConteiner;
        let label = document.createElement("label");
            label.classList.add("setting-label");
            label.setAttribute("for", "count-item");
            label.innerText ="Select play-field size:";
            this.settingConteiner.append(label);
        let select = document.createElement("select");
            select.classList.add("setting-list");
            select.setAttribute("id", "count-item");
            this.settingConteiner.append(select);
            this.select = select;

            for (let i = 3; i <= 8; i++) {
                let option = document.createElement("option");
                    option.classList.add("setting-options");
                    option.setAttribute("value", `${i}`);
                    option.innerText = `${i}x${i}`;
                this.select.append(option);
            }
        let settingButton = document.createElement("button");
            settingButton.classList.add("game-button","setting-button");
            settingButton.setAttribute("type", "button");
            settingButton.innerText = "OK";
            this.settingConteiner.append(settingButton);
            this.buttonCount = settingButton;
            this.setItemCount();
    };

    openSetting(){
        this.buttonSetting.addEventListener("click",()=>{
            console.log("opensetting");
            this.createSettingItem();
        });
    };

    replaceItems(){
        this.puzzleItems.forEach(element => {
            element.addEventListener("click", (e)=>{
                if(this.sound == true){
                    let sound = new Audio("../assets/sounds/move.mp3");
                    sound.play();
                }
                let targetButton = e.target;
                if(!targetButton.classList.contains("empty")){      //if click event not on zero button
                    let zero = document.querySelector(".empty");    //get zero
                    let movetItem = new MoveItems(targetButton, zero);
                        movetItem.replaceItems();
                        this.step += movetItem.getStep();
                        this.setStepCount();
                    let validation = new Validation(this.puzzleItems, this.itemCount);   //check if the game is finished  - all numbers in right order
                    let result = validation.validation();
                    if(result === true){
                        this.puzzleConteiner.remove();
                        this.toggleGameButtonHide();
                        let winNotice = new Win(this.gameTime, this.step);
                        let winNoticeConteiner = winNotice.createWinNotice();
                            document.body.append(winNoticeConteiner);
                            winNoticeConteiner.addEventListener("click", ()=>{
                                winNoticeConteiner.remove();
                                this.toggleMainButtonHide();
                                this.itemCount = "4";
                                this.puzzleItems = [];
                            });
                    };
                };
            });
        });
    };

    restart(){
        this.buttonRestart.addEventListener("click", ()=>{
            this.isLoadSavedGame = false;
            this.puzzleItems = [];
            this.clear();
            this.puzzleConteiner.remove();
            this.buttonEnd.remove();
            this.buttonRestart.remove();
            this.startGame();
            this.setStepCount();
            this.toggleMainButtonHide();
        })
    }

    end(){              //if a user click on button "end"
        this.buttonEnd.addEventListener("click",()=>{
            let save = new SaveGame(this.puzzleItems, this.gameTime, this.step, this.itemCount);
            let popup = save.createPopup("Do you want to save the game?");
                this.mainConteiner.append(popup);
            let saveButton = save.createSaveButton();
                popup.append(saveButton);
                this.saveButton = saveButton;
            let rejectButton = save.createRejectButton();
                this.rejectButton = rejectButton;
                popup.append(rejectButton);
            saveButton.addEventListener("click", ()=>{
                popup.remove();
                save.setDataToLocalStorage();
                let popupEnd = save.createPopup("Your game has been saved");
                this.mainConteiner.append(popupEnd);
                setTimeout(() => {
                    popupEnd.remove();
                }, 1500);
                this.toggleMainButtonHide();
                this.puzzleItems = [];
                this.createLoadGameButton();
            });
            rejectButton.addEventListener("click", ()=>{
                popup.remove();
                this.puzzleItems = [];
                this.clear();
                this.itemCount = "4";
                this.toggleMainButtonHide();
            });
            this.puzzleConteiner.remove();
            this.toggleGameButtonHide();
        });
    };

    toggleSound(){
        this.soundButton.addEventListener("click", ()=>{
            this.sound = !this.sound;
            if(this.sound == true){
                this.soundButton.style.backgroundImage = "url(../assets/images/volume_off.svg)";
            }else{
                this.soundButton.style.backgroundImage = "url(../assets/images/volume_up.svg)"; 
            }
        });
    };

    toggleMainButtonHide(){
        this.buttonPlay.classList.toggle("button--hidden");       //hidden buttons
        this.buttonSetting.classList.toggle("button--hidden");
        if(this.buttonLoad){
            this.buttonLoad.classList.toggle("button--hidden");
        }
    };

    toggleGameButtonHide(){
        if(this.buttonEnd){
            this.buttonEnd.classList.toggle("button--hidden");
        }
        if(this.buttonRestart){
            this.buttonRestart.classList.toggle("button--hidden");
        }
    };

    clear(){
        this.gameTime = {
            hours: 0,
            minutes: 0,
            seconds: 0
        };
        this.step = 0;
    };

    loadSavedGame(){
        let loadGame = new LoadGame();
        this.loadGame = loadGame.checkDataInLocalStorage();
            if(this.loadGame !== null){
                if(this.buttonLoad){
                    this.buttonLoad.remove();
                }else{
                    this.createLoadGameButton();
                }
            };
    };

    createLoadGameButton() {
        if(this.buttonLoad){
            this.buttonLoad.remove();
        }
        let loadGame = new LoadGame();
        this.buttonLoad = loadGame.createLoadButton();
        this.mainConteiner.append(this.buttonLoad);
        this.buttonLoad.addEventListener("click", ()=>{
            this.isLoadSavedGame = true;
            this.loadGame = loadGame.checkDataInLocalStorage();
            this.setLoadData();
            this.startGame();
        });
    }

    setLoadData(){
        this.itemCount = this.loadGame.itemCount;
        this.gameTime.hours = this.loadGame.time.hours;
        this.gameTime.minutes= this.loadGame.time.minutes;
        this.gameTime.seconds= this.loadGame.time.seconds; 
        this.step = this.loadGame.step;
    };
    
    setItemCount(){
        this.buttonCount.addEventListener("click",()=>{
            let count = this.select.value;
                this.itemCount = count;
                this.settingConteiner.classList.toggle("setting-hidden");
                this.toggleMainButtonHide();
        });
    };

    setTime(){
        let timeConteiner  = document.createElement("span");
            this.time.append(timeConteiner);
        let count = this.gameTime.seconds || 0; 
        let seconds = this.gameTime.seconds || 0; 
        let minutes = this.gameTime.minutes || 0;
        let hours = this.gameTime.hours || 0;
        
        setInterval(() => {
            count ++;
            seconds = count < 10? "0" + count: count;
            this.gameTime.seconds = seconds;
            minutes = this.gameTime.minutes < 10? "0" + this.gameTime.minutes: this.gameTime.minutes;
            hours = this.gameTime.hours < 10? "0" + this.gameTime.hours: this.gameTime.hours; 
            if(seconds >= 59){
                count = 0;
                this.gameTime.minutes ++;
            }
            if(minutes >= 59){
            this.gameTime.hours ++;
            }
            timeConteiner.innerHTML = hours + " : " + minutes + " : " + seconds; 
        }, 1000);
    };

    setStepCount(){
        this.stepCountConteiner.innerHTML = "Step count: " + this.step; 
    };
}

let game = new GemPuzzle();
game.init();


