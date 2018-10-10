import {gameObject} from './gameObject.js';
import {canvas, CANVAS_WIDTH, CANVAS_HEIGHT} from './canvas.js';
import {Polygon} from './polygon.js';

export class ButtonController extends gameObject{
    constructor(){
        super("button");
        this.buttonList = new Array();
        console.log("yeah");
        let buttonImage1 = new Polygon("button1", 1);
        buttonImage1.setPosition(CANVAS_WIDTH/2-140, -240);
        canvas.setTarget(buttonImage1);
        this.buttonList.push(buttonImage1);
        let buttonImage2 = new Polygon("button2", 1);
        buttonImage2.setPosition(-CANVAS_WIDTH/2+400, -440);
        canvas.setTarget(buttonImage2);
        this.buttonList.push(buttonImage2);
        let buttonImage3 = new Polygon("button3", 1);
        buttonImage3.setPosition(-CANVAS_WIDTH/2+140, -440);
        canvas.setTarget(buttonImage3);
        this.buttonList.push(buttonImage3);
    }
}