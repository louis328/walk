import {gameObject} from './gameObject.js';
import {canvas} from './canvas.js';
import {Polygon} from './polygon.js';
import {keyManager} from './keyManager.js';
import {messenger} from './messaenger.js';

export class Hiyoko extends gameObject{
    constructor() {
        super("hiyoko");

        this.image = new Polygon("hiyoko", 0);
        canvas.setTarget(this.image);

        this.x = 0;
        this.y = 0;
        this.preX = 0;
        this.preY = 0;
        this.speedY = 0;
        this.jamp = 0;
        this.halfWidth = 20;
        this.halfHeight = 20;

        this.time = 0;
    }
    process(){
        this.preX = this.x;
        this.preY = this.y;

        this.speedY += (-1.1);
        {
            let absSpeedY = Math.abs(this.speedY);
            if(absSpeedY > 10){
                this.speedY = this.speedY / absSpeedY * 10.0;
            }
        }

        if(keyManager.getKeyState(65)){
            this.x -= 8;
        }
        if(keyManager.getKeyState(68)){
            this.x += 8;
        }
        if(keyManager.getKeyState(87) && this.jamp == 0){
            this.speedY += 28;
            this.jamp += 1;
        }
        
        this.y += this.speedY;
        
        let message = new Object();
        message['toID'] = "blocks";
        message['message'] = "collision";
        message['x'] = this.x;
        message['preX'] = this.preX;
        message['vecX'] = 1;
        if(this.x < this.preX){
            message['vecX'] = -1;
        }
        message['vecY'] = 1;
        if(this.y < this.preY){
            message['vecY'] = -1;
        }
        message['y'] = this.y;
        message['preY'] = this.preY;
        message['halfW'] = this.halfWidth;
        message['halfH'] = this.halfHeight;
        let hitReply = messenger.express(message);
        //console.log(hitReply);
        if(hitReply['result'] == true){
            this.x = hitReply['x'];
            this.y = hitReply['y'];
            if(hitReply['landing'] == true){
                this.jamp = 0;
                this.speedY = 0;
            }
        }
        //
        this.image.setPosition(this.x, this.y);
    }
    receive(mes){
        let message = mes['message'];
        if(message === 'touchStart'){
            this.x = mes['x'];
            this.x = mes['y'];
            this.image.setPosition(this.x, this.y);
        }
    }
}