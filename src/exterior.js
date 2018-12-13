import {gameObject} from './gameObject.js';
import {canvas, CANVAS_WIDTH, CANVAS_HEIGHT, PLAY_WIDTH, PLAY_HEIGHT} from './canvas.js';
import * as polygon from './polygon.js';
export class Exterior extends gameObject{
    constructor(){
        super("exterior");
        
        this.frameRight = new polygon.Polygon("frame", polygon.DRAW_LV_EXTERIOR);
        this.frameRight.setPosition(4, 10);


        {
            let cournerImage = new polygon.Polygon("corner", polygon.DRAW_LV_EXTERIOR); 
            cournerImage.setPosition(0, 8 + (CANVAS_HEIGHT/2 - (CANVAS_HEIGHT/2 - (40 + PLAY_HEIGHT)) / 2) - canvas.getHeightDifference());
            cournerImage.setScale((CANVAS_WIDTH)/16, (8+ CANVAS_HEIGHT/2 - (40 + PLAY_HEIGHT)) / 16);

        }
        {
            let cournerImage = new polygon.Polygon("corner", polygon.DRAW_LV_EXTERIOR); 
            cournerImage.setPosition(CANVAS_WIDTH / 2 + 4, 0 - canvas.getHeightDifference());
            cournerImage.setScale((CANVAS_WIDTH - PLAY_WIDTH) / 16, CANVAS_HEIGHT / 16);

        }
        {
            let cournerImage = new polygon.Polygon("corner", polygon.DRAW_LV_EXTERIOR); 
            cournerImage.setPosition(-CANVAS_WIDTH / 2 - 4, 0 - canvas.getHeightDifference());
            cournerImage.setScale((CANVAS_WIDTH - PLAY_WIDTH) / 16, CANVAS_HEIGHT / 16);

        }
        {
            let cournerImage = new polygon.Polygon("corner", polygon.DRAW_LV_EXTERIOR); 
            cournerImage.setPosition(0, -CANVAS_HEIGHT/2 + (40 + CANVAS_HEIGHT/2)/2 - canvas.getHeightDifference() - 4);
            cournerImage.setScale(CANVAS_WIDTH/16, (40 + CANVAS_HEIGHT/2)/16);

        }
    }
}