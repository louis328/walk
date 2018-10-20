import {gameObject} from './gameObject.js';
import {canvas, CANVAS_WIDTH, CANVAS_HEIGHT} from './canvas.js';
import {Polygon} from './polygon.js';
import {messenger} from './messaenger.js';

class Button{
    constructor(x,y,name){
        this.on = false;
        this.id = -1;//タッチイベントのidentifier
        this.x = x;
        this.y = y;
        this.image = new Polygon(name, 0);
        this.image.setPosition(x, y - canvas.getHeightDifference());
    }
}
export class ButtonController extends gameObject{
    constructor(){
        super("button");
        this.buttonList = new Array();
        let button1 = new Button(CANVAS_WIDTH/2-200, -200, "button1");
        this.buttonList.push(button1);
        let button2 = new Button(-CANVAS_WIDTH/2+400, -400+10, "button2");
        this.buttonList.push(button2);
        let button3 = new Button(-CANVAS_WIDTH/2+140, -400, "button3");
        this.buttonList.push(button3);

    }
    process(){
        let button_on = this.buttonList[0];
        let button_right = this.buttonList[1];
        let button_left = this.buttonList[2];
        if(button_on.on == true){
            let newMessage = new Object();
            newMessage['message'] = 'button_on';
            this.send(newMessage);
            button_on.on = false;
        }
        if(button_right.on == true){
            let newMessage = new Object();
            newMessage['message'] = 'button_right';
            this.send(newMessage);
        }
        if(button_left.on == true){
            let newMessage = new Object();
            newMessage['message'] = 'button_left';
            this.send(newMessage);
        }
    }
    receive(mes){
        let message = mes['message'];
        let button_on = this.buttonList[0];
        let button_right = this.buttonList[1];
        let button_left = this.buttonList[2];
        if(message === 'touchStart' || message === 'touchMove' || message === 'touchEnd'){
            let touch_x = mes['x'];
            let touch_y = mes['y'];
            if(message === 'touchStart'){
                if((button_on.x - touch_x) * (button_on.x - touch_x) +(button_on.y - touch_y) * (button_on.y - touch_y) < 128*128){
                    button_on.on = true;
                }
            }
            if(message !== 'touchEnd'){
                if((button_right.x - touch_x) * (button_right.x - touch_x) +(button_right.y - touch_y) * (button_right.y - touch_y) < 128*128){
                    if(button_right.on == false && (message === 'touchStart' || message === 'touchMove')){
                        button_right.on = true;
                        button_right.id = mes['identifier'];
                    }
                }
                else{
                    if(button_right.on && button_right.id === mes['identifier']){//押した指が範囲外に移動した
                        button_right.on = false;
                        button_right.id = -1;
                    }
                }
            }
            else{//touchEnd
                if(button_right.on && button_right.id === mes['identifier']){
                    button_right.on = false;
                    button_right.id = -1;
                }
            }
            if(message !== 'touchEnd'){
                if((button_left.x - touch_x) * (button_left.x - touch_x) +(button_left.y - touch_y) * (button_left.y - touch_y) < 128*128){
                    if(button_left.on == false && (message === 'touchStart' || message === 'touchMove')){
                        button_left.on = true;
                        button_left.id = mes['identifier'];
                    }
                }
                else{
                    if(button_left.on && button_left.id === mes['identifier']){//押した指が範囲外に移動した
                        button_left.on = false;
                        button_left.id = -1;
                    }
                }
            }
            else{//touchEnd
                if(button_left.on && button_left.id === mes['identifier']){
                    button_left.on = false;
                    button_left.id = -1;
                }
            }

            
            //console.log(button_on.on + ", " + button_right.on + ", " + button_left.on);
        }
    }
}