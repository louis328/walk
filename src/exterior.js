import {gameObject} from './gameObject.js';
import {canvas, CANVAS_WIDTH, CANVAS_HEIGHT, PLAY_WIDTH, PLAY_HEIGHT} from './canvas.js';
import {Polygon} from './polygon.js';
export class Exterior extends gameObject{
    constructor(){
        super("exterior");
        
        
        
        this.frameTop = new Polygon("frame", 1);
        this.frameTop.setPosition(0, CANVAS_HEIGHT/2 - canvas.getHeightDifference());
        this.frameTop.setScale((PLAY_WIDTH)/16, 1);
        canvas.setTarget(this.frameTop);

        this.frameRight = new Polygon("frame", 1);
        this.frameRight.setPosition(PLAY_WIDTH/2 + 8, (CANVAS_HEIGHT/2 - PLAY_HEIGHT / 2) - canvas.getHeightDifference());
        this.frameRight.setRotate(Math.PI / 2);
        this.frameRight.setScale((PLAY_HEIGHT+32)/16, 1);
        canvas.setTarget(this.frameRight);

        this.frameLeft = new Polygon("frame", 1);
        this.frameLeft.setPosition(-PLAY_WIDTH/2 - 8, (CANVAS_HEIGHT/2 - PLAY_HEIGHT / 2) - canvas.getHeightDifference());
        this.frameLeft.setRotate(Math.PI / 2);
        this.frameLeft.setScale((PLAY_HEIGHT+32)/16, 1);
        canvas.setTarget(this.frameLeft);

        this.frameBottom = new Polygon("frame", 1);
        this.frameBottom.setPosition(0, CANVAS_HEIGHT/2 - PLAY_HEIGHT - 16 - canvas.getHeightDifference());
        this.frameBottom.setScale((PLAY_WIDTH)/16, 1);
        canvas.setTarget(this.frameBottom);

        {
            let cournerImage = new Polygon("corner", 1); 
            cournerImage.setPosition(0, CANVAS_HEIGHT/2 + 4 - canvas.getHeightDifference());
            cournerImage.setScale((CANVAS_WIDTH)/16, 1);
            canvas.setTarget(cournerImage);
        }
        {
            let cournerImage = new Polygon("corner", 1); 
            cournerImage.setPosition(CANVAS_WIDTH / 2 + 4, 0 - canvas.getHeightDifference());
            cournerImage.setScale((CANVAS_WIDTH - PLAY_WIDTH) / 16, CANVAS_HEIGHT / 16);
            canvas.setTarget(cournerImage);
        }
        {
            let cournerImage = new Polygon("corner", 1); 
            cournerImage.setPosition(-CANVAS_WIDTH / 2 - 4, 0 - canvas.getHeightDifference());
            cournerImage.setScale((CANVAS_WIDTH - PLAY_WIDTH) / 16, CANVAS_HEIGHT / 16);
            canvas.setTarget(cournerImage);
        }
        {
            let cournerImage = new Polygon("corner", 1); 
            cournerImage.setPosition(0, (-CANVAS_HEIGHT/2 + (CANVAS_HEIGHT-PLAY_HEIGHT)/2) - 12 - canvas.getHeightDifference());
            cournerImage.setScale(CANVAS_WIDTH/16, (CANVAS_HEIGHT-PLAY_HEIGHT)/16);
            canvas.setTarget(cournerImage);
        }
    }
}