export default class ShuffleItems{
    constructor(count) {
        this.count = count;
        this.result = 0;
        this.sum = 0;
        this.shuffleArray = [];
    }

    checkSolvability(){
        while (this.result == 0) {
            this.shuffle();        
              for (let i = 0; i < this.count; i++) {
                if(i != 0){
                  for (let j = i+1; j <=this.count; j++) {
                    if(this.shuffleArray[i] > this.shuffleArray[j] && this.shuffleArray[j] != 0){
                        this.sum ++;
                    }
                  }
                }
              }

        if(this.count % 2 == 0){
          let zeroPosition = this.getZeroPosition();
          this.sum =  this.sum + zeroPosition;
          if(this.sum % 2 == 0){
            this.result = 1;
            return this.shuffleArray;
          }
        }
        if(this.count % 2 != 0){
          if(this.sum % 2 == 0 && this.sum != 0){  //if(this.sum % 2 != 0)
            this.result = 1;
            return this.shuffleArray;
          }
        }
      }
    }

    shuffle(){
        let array = [...Array(this.count**2).keys()];
        for (let i = array.length - 1; i > 0; i--){
           let randomNumber = Math.floor(Math.random() * (i + 1));
           let currentnumber = array[i];
           array[i] = array[randomNumber];
           array[randomNumber] = currentnumber;
          }
        this.shuffleArray  = array;
      };

      getZeroPosition(){
        let copyArray = this.shuffleArray.slice();
        let row;
        let resultArray = [];
        for (let i = 1; i<= copyArray.length; i++) {
          while (copyArray.length) {
            resultArray.push(copyArray.splice(0, this.count));
          }
          resultArray.forEach((element, index) => {
           if(element.includes(0,0)){
             row = index + 1;
           }
          });
         }
         return row;
      }
      
} 



