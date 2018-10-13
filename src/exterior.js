import {gameObject} from './gameObject.js';
import {canvas, CANVAS_WIDTH, CANVAS_HEIGHT} from './canvas.js';
import {Polygon} from './polygon.js';
export class Exterior extends gameObject{
    constructor(){
        super("exterior");
        
        {
            let cournerImage = new Polygon("corner", 1); 
            cournerImage.setPosition(CANVAS_WIDTH/2-4,CANVAS_HEIGHT/2 - 2 - canvas.getHeightDifference());
            canvas.setTarget(cournerImage);
        }
        {
            let cournerImage = new Polygon("corner", 1); 
            cournerImage.setPosition(-CANVAS_WIDTH/2+4,CANVAS_HEIGHT/2 - 2 - canvas.getHeightDifference());
            canvas.setTarget(cournerImage);
        }
        {
            let cournerImage = new Polygon("corner", 1); 
            cournerImage.setPosition(CANVAS_WIDTH/2-4,CANVAS_HEIGHT/2 - canvas.getHeightDifference() - 655);
            canvas.setTarget(cournerImage);
        }
        {
            let cournerImage = new Polygon("corner", 1); 
            cournerImage.setPosition(-CANVAS_WIDTH/2+4,CANVAS_HEIGHT/2 - canvas.getHeightDifference() - 655);
            canvas.setTarget(cournerImage);
        }
        
        this.frameTop = new Polygon("frame", 1);
        this.frameTop.setPosition(0, CANVAS_HEIGHT/2 - 2 - canvas.getHeightDifference());
        this.frameTop.setScale((CANVAS_WIDTH-16)/16, 1);
        canvas.setTarget(this.frameTop);

        this.frameRight = new Polygon("frame", 1);
        this.frameRight.setPosition(CANVAS_WIDTH/2-4, CANVAS_HEIGHT/4 - canvas.getHeightDifference() - 10);
        this.frameRight.setRotate(Math.PI / 2);
        this.frameRight.setScale(CANVAS_HEIGHT/16*0.5, 1);
        canvas.setTarget(this.frameRight);

        this.frameLeft = new Polygon("frame", 1);
        this.frameLeft.setPosition(-CANVAS_WIDTH/2+4, CANVAS_HEIGHT/4 - canvas.getHeightDifference() - 11);
        this.frameLeft.setRotate(Math.PI / 2);
        this.frameLeft.setScale((CANVAS_HEIGHT+4)/16*0.5, 1);
        canvas.setTarget(this.frameLeft);

        this.frameBottom = new Polygon("frame", 1);
        this.frameBottom.setPosition(2, CANVAS_HEIGHT/2 - canvas.getHeightDifference() - 655);

        this.frameBottom.setScale((CANVAS_WIDTH-18)/16, 1);
        canvas.setTarget(this.frameBottom);

        {
            let cournerImage = new Polygon("corner", 1); 
            cournerImage.setPosition(0, -20 - CANVAS_HEIGHT/4 - canvas.getHeightDifference());
            cournerImage.setScale(CANVAS_WIDTH/16, CANVAS_HEIGHT/32);
            canvas.setTarget(cournerImage);
        }
    }
}