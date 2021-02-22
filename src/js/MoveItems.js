export default class MoveItems{
    constructor(targetButton, zeroButton){
        this.target = targetButton;
        this.zero = zeroButton;
        this.zeroCoord = {
            x : null,
            y : null
        }
        this.targetCoord = {
            x: null,
            y: null
        }
        this.size = null;
        this.data = null;
        this.step = 0;
    }

    getdataNumber(){
        this.data =  this.target.dataset.number;
    }

    getsize(){
        this.size =  this.target.offsetWidth * 1.5;
    }

    setTargetCoord(){
        this.targetCoord.x = Math.round(this.target.getBoundingClientRect().x);
        this.targetCoord.y = Math.round(this.target.getBoundingClientRect().y);
    }

    setZeroCoord(){
        this.zeroCoord.x = Math.round(this.zero.getBoundingClientRect().x); 
        this.zeroCoord.y = Math.round(this.zero.getBoundingClientRect().y);
    }


    replaceItems(){
            this.getdataNumber();
            this.getsize();
            this.setTargetCoord();
            this.setZeroCoord();
            let deltaX = Math.abs(this.zeroCoord.x - this.targetCoord.x);
            let deltaY = Math.abs(this.zeroCoord.y - this.targetCoord.y);
            if(deltaY == 0 && deltaX <= this.size){
                this.changeItems();
                this.increaseStep();
            }
            if(deltaX == 0 && deltaY <= this.size){
                this.changeItems();
                this.increaseStep();
            }
    }
                
    changeItems(){
        this.target.setAttribute("data-number", "0");
        this.target.classList.remove("puzzle-item");
        this.target.classList.add("empty");
        this.target.innerText = "";
        this.zero.setAttribute("data-number" , this.data);
        this.zero.classList.remove("empty");
        this.zero.classList.add("puzzle-item");
        this.zero.innerText = this.data;             
    }

    increaseStep(){
        this.step ++;
    }

    getStep(){
        return this.step;
    }

    dragAndDrop(){
        this.setTargetCoord();
        this.setZeroCoord();
        let deltaX = Math.abs(this.zeroCoord.x - this.targetCoord.x);
        let deltaY = Math.abs(this.zeroCoord.y - this.targetCoord.y);
        if(deltaY <= this.target.offsetWidth+10 && deltaX == 0 || deltaX <= this.target.offsetWidth+10 && deltaY == 0){
            this.getdataNumber();
            setTimeout(() => {
                this.target.classList.add("hide-item");
            }, 0);
            this.target.addEventListener("dragend", (e)=>{
                e.target.classList.remove("hide-item");
            });
            this.zero.addEventListener("dragover", (e)=>{
                e.preventDefault();
            });
            this.zero.addEventListener("dragenter", (e)=>{
                e.preventDefault();
                e.target.classList.add("drag-hover");
            });
            this.zero.addEventListener("dragleave", (e)=>{
                e.target.classList.remove("drag-hover");
            });
            this.zero.addEventListener("drop", (e)=>{
                this.target.setAttribute("data-number", "0");
                this.target.classList.remove("puzzle-item");
                this.target.classList.add("empty");
                this.target.innerText = "";
                e.target.setAttribute("data-number" , this.data);
                e.target.classList.remove("empty");
                e.target.classList.add("puzzle-item");
                e.target.innerText = this.data;
                e.target.classList.remove("drag-hover");
            })
        }else{
            return;
        }

    }

};


