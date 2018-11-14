import {gameObject} from './gameObject.js';
import {Polygon} from './polygon.js';

class Star{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.halfWidth = 32;
        this.halfHeight = 32;
        this.image = new Polygon("star", 7);
        this.image.setPosition(this.x, this.y);
        this.image.setPxToUVArray(0,0, 64,64);
        this.run = false;
    }
    touched(){
        this.run = true;
        this.image.setPxToUVArray(64,0, 128,64);
    }
    isRunning(){
        return this.run;
    }
    dead(){
        this.image.dead();
    }
}
class Tiara{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.image = new Polygon("tiara", 7);
        this.image.setPosition(this.x, this.y);
        this.image.setPxToUVArray(0,0, 64,64);
    }
    dead(){
        this.image.dead();
    }
}
export class Stars extends gameObject{
    constructor(){
        super("stars");

        this.stars = new Array();
        this.stars.push(new Star(60, -100));
        this.stars.push(new Star(140, -100));
        this.stars.push(new Star(220, -100));

        this.count = this.stars.length;
        this.tiara = null;
    }
    receive(mes){
        if(mes['message'] === "player_position"){
            let x = mes['x'];
            let y = mes['y'];
            if(this.tiara != null){
                if((this.tiara.x - x)*(this.tiara.x - x) + (this.tiara.y - y)*(this.tiara.y - y) < (mes['halfH'] + 32) * (mes['halfH'] + 32)){
                    let clearMessage = new Object();
                    clearMessage['message'] = "clear";
                    this.send(clearMessage);
                    this.tiara.dead();
                    this.tiara = null;
                }
            }
            for(let star of this.stars){
                let s_x = star.x;
                let s_y = star.y;
                if((s_x - x)*(s_x - x) + (s_y - y)*(s_y - y) < (mes['halfH'] + 32) * (mes['halfH'] + 32)){
                    if(!star.isRunning()){
                        star.touched();
                        this.count -= 1;
                        if(this.count == 0){
                            this.tiara = new Tiara(-200, -100);
                        }
                    }
                }
            }
        }
    }
    destructor(){
        for(let star of this.stars){
            star.dead();
        }
        if(this.tiara != null){
            this.tiara.dead();
        }
    }
}