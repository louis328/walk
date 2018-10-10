import {gameObject} from './gameObject.js';
import {canvas, CANVAS_WIDTH, CANVAS_HEIGHT} from './canvas.js';
import {Polygon} from './polygon.js';

class Button{
    constructor(x,y,name){
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
        let button1 = new Button(CANVAS_WIDTH/2-140, -300, "button1");
        this.buttonList.push(button1);
        let button2 = new Button(-CANVAS_WIDTH/2+400, -500, "button2");
        this.buttonList.push(button2);
        let button3 = new Button(-CANVAS_WIDTH/2+140, -500, "button3");
        this.buttonList.push(button3);

    }
}