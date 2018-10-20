import {gameObject} from './gameObject.js';
import {canvas, CANVAS_WIDTH, CANVAS_HEIGHT, PLAY_WIDTH, PLAY_HEIGHT} from './canvas.js';
import {Polygon} from './polygon.js';
export class Exterior extends gameObject{
    constructor(){
        super("exterior");
        
        

        this.frameRight = new Polygon("frame", 1);
        this.frameRight.setPosition(PLAY_WIDTH/2 + 8, 0);
        this.frameRight.setRotate(Math.PI / 2);
        this.frameRight.setScale((PLAY_HEIGHT+12)/16, 1);
  

        this.frameLeft = new Polygon("frame", 1);
        this.frameLeft.setPosition(-PLAY_WIDTH/2 - 8, 0);
        this.frameLeft.setRotate(Math.PI / 2);
        this.frameLeft.setScale((PLAY_HEIGHT+12)/16, 1);


        this.frameTop = new Polygon("frame", 1);
        this.frameTop.setPosition(0, PLAY_HEIGHT/2 + 8);
        this.frameTop.setScale((PLAY_WIDTH + 8)/16, 1);


        this.frameBottom = new Polygon("frame", 1);
        this.frameBottom.setPosition(0, -PLAY_HEIGHT/2 - 8);
        this.frameBottom.setScale((PLAY_WIDTH + 8)/16, 1);


        {
            let cournerImage = new Polygon("corner", 1); 
            cournerImage.setPosition(0, 8 + (CANVAS_HEIGHT/2 - (CANVAS_HEIGHT/2 - (40 + PLAY_HEIGHT)) / 2) - canvas.getHeightDifference());
            cournerImage.setScale((CANVAS_WIDTH)/16, (8+ CANVAS_HEIGHT/2 - (40 + PLAY_HEIGHT)) / 16);

        }
        {
            let cournerImage = new Polygon("corner", 1); 
            cournerImage.setPosition(CANVAS_WIDTH / 2 + 4, 0 - canvas.getHeightDifference());
            cournerImage.setScale((CANVAS_WIDTH - PLAY_WIDTH) / 16, CANVAS_HEIGHT / 16);

        }
        {
            let cournerImage = new Polygon("corner", 1); 
            cournerImage.setPosition(-CANVAS_WIDTH / 2 - 4, 0 - canvas.getHeightDifference());
            cournerImage.setScale((CANVAS_WIDTH - PLAY_WIDTH) / 16, CANVAS_HEIGHT / 16);

        }
        {
            let cournerImage = new Polygon("corner", 1); 
            cournerImage.setPosition(0, -CANVAS_HEIGHT/2 + (40 + CANVAS_HEIGHT/2)/2 - canvas.getHeightDifference() - 4);
            cournerImage.setScale(CANVAS_WIDTH/16, (40 + CANVAS_HEIGHT/2)/16);

        }
    }
}