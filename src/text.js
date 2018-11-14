import {canvas} from './canvas.js';

let text_serial_number = 0;
export class Text{
    constructor(str, x, y){
        this.id = text_serial_number;
        ++text_serial_number;
        this.text = str;
        this.x = x;
        this.y = y;
        this.font = "メイリオ";
        this.size = "50px";
        this.color = "rgba(255,255,255,1.0)";
        canvas.textArray.push(this);
    }
    dead(){
        for(let it in canvas.textArray){
            if(canvas.textArray[it].id == this.id){
                canvas.textArray.splice(it, 1);
                break;
            }
        }
    }
}

