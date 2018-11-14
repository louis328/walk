import {gameObject} from './gameObject.js';
import {canvas} from './canvas.js';
import {Polygon} from './polygon.js';
import {keyManager} from './keyManager.js';
import {messenger} from './messaenger.js';
import {motionController} from './motion.js';

export class Hiyoko extends gameObject{
    constructor() {
        super("hiyoko");

        this.image = new Polygon("hiyoko", 5);

        this.motion = motionController.create("./resource/motion_hiyoko.json");
        this.motion.start("stand");

        this.x = 0;
        this.y = 0;
        this.preX = 0;
        this.preY = 0;
        this.speedY = 0;
        this.jamp = 1;
        this.halfWidth = 20;
        this.halfHeight = 20;
        this.direction = 1;//右
        
        this.actionMap = new Object();//仮想ボタン入力と制御を繋げる
        this.actionMap['jump'] = false;
        this.actionMap['right'] = false;
        this.actionMap['left'] = false;
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

        let isWalk = false;
        if(keyManager.getKeyState(65) || this.actionMap['left']){
            this.motion.start("walk");
            this.x -= 8;
            this.direction = -1;
            isWalk = true;
        }
        if(keyManager.getKeyState(68) || this.actionMap['right']){
            this.motion.start("walk");
            this.x += 8;
            this.direction = 1;
            isWalk = true;
        }
        if(!isWalk){
            this.motion.start("stand");
        }

        let uv = this.motion.getUV();
        if(this.direction == 1){
            this.image.setPxToUVArray(uv.start_x,uv.start_y, uv.end_x,uv.end_y);
        }
        else{
            this.image.setPxToUVArray(uv.end_x,uv.start_y, uv.start_x,uv.end_y);
        }

        if((keyManager.isKeyJustDown(87) || this.actionMap['jump']) && this.jamp == 0){
            this.jump();
        }
        
        this.y += this.speedY;
        
        let message = new Object();
        message['toID'] = "blocks";
        message['message'] = "collision";
        message['x'] = this.x;
        message['preX'] = this.preX;
        message['vecX'] = (this.x < this.preX) ? -1 : 1;
        message['vecY'] = (this.y < this.preY) ? -1 : 1;
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
        this.image.setPosition(this.x, this.y);
        message['message'] = 'player_position';
        message['toID'] = "";
        this.send(message);

        this.actionMap['jump'] = false;
        this.actionMap['right'] = false;
        this.actionMap['left'] = false;
    }
    jump(){
        this.speedY += 28;
        this.jamp += 1;
    }
    receive(mes){
        let message = mes['message'];
        if(message === 'touchStart'){
            /*this.x = mes['x'];
            this.y = mes['y'] + canvas.getHeightDifference();
            this.jamp = 0;
            this.speedY = 0;
            this.image.setPosition(this.x, this.y);*/
        }
        else if(message === 'button_on'){
            this.actionMap['jump'] = true;console.log("jump");
        }
        else if(message === 'button_right'){
            this.actionMap['right'] = true;
        }
        else if(message === 'button_left'){
            this.actionMap['left'] = true;
        }
    }
    destructor(){
        this.image.dead();
    }
}