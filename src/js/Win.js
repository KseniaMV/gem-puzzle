export default class Win{
    constructor(time, step){
        this.time = `${time.hours}:${time.minutes}:${time.seconds}`;
        this.step = step;
        this.winNotice =  "win!";
        this.winCount = `You spend ${this.time}s and took ${this.step} steps`;
    }

    createWinNotice(){
        let winNoticeConteiner = document.createElement("div");
            winNoticeConteiner.classList.add("win-conteiner");
            document.body.append(winNoticeConteiner);
        let winNotice = document.createElement("div");
            winNotice.classList.add("win-notice");
            winNoticeConteiner.append(winNotice);
        let winCount = document.createElement("div");
            winCount.classList.add("win-count");
            winNotice.after(winCount);
        let closeButton = document.createElement("button");
            closeButton.classList.add("closeButton");
            closeButton.innerHTML = "x";
            winNoticeConteiner.append(closeButton);
        let lettersArray = this.winNotice.split("");
        lettersArray.forEach((item,index) => {
            let letter = document.createElement("span");
                letter.innerHTML = item;
                winNotice.append(letter);
            setInterval(() => {
                letter.classList.add("animateLetters"); 
            },index*500);
        });
        let count = document.createElement("span");
        count.innerHTML = this.winCount;
            winCount.append(count);
            setInterval(() => {
                count.classList.add("animateLetters"); 
            },2000);
        return winNoticeConteiner;
    }


}