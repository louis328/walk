import {gameObject} from './gameObject.js';
import {canvas, CANVAS_WIDTH, CANVAS_HEIGHT} from './canvas.js';
import {Polygon} from './polygon.js';
import {messenger} from './messaenger.js';

class Button{
    constructor(x,y,name){
        this.on = false;
        this.x = x;
        this.y = y;
        this.image = new Polygon(name, 1);
        this.image.setPosition(x, y - canvas.getHeightDifference());
        canvas.setTarget(this.image);
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
    receive(mes){
        let message = mes['message'];
        let button_on = this.buttonList[0];
        let button_right = this.buttonList[1];
        let button_left = this.buttonList[2];
        if(message === 'touchStart' || message === 'touchMove'){
            let touch_x = mes['x'];
            let touch_y = mes['y'];
            if(message === 'touchStart'){
                if((button_on.x - touch_x) * (button_on.x - touch_x) +(button_on.y - touch_y) * (button_on.y - touch_y) < 128*128){
                    button_on.on = true;
                }
            }
            if((button_right.x - touch_x) * (button_right.x - touch_x) +(button_right.y - touch_y) * (button_right.y - touch_y) < 128*128){
                button_right.on = true;
            }
            else{
                button_right.on = false;
            }
            if((button_left.x - touch_x) * (button_left.x - touch_x) +(button_left.y - touch_y) * (button_left.y - touch_y) < 128*128){
                button_left.on = true;
            }
            else{
                button_left.on = false;
            }
        }
        else if(message === 'touchEnd'){
            button_right.on = false;
            button_left.on = false;
        }
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
            button_right.on = false;
        }
        if(button_left.on == true){
            let newMessage = new Object();
            newMessage['message'] = 'button_left';
            this.send(newMessage);
            button_left.on = false;
        }
    }
}