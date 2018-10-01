import {gameObject} from './gameObject.js';
import {canvas} from './canvas.js';
import {Polygon} from './polygon.js';

export class Hiyoko extends gameObject{
    constructor() {
        super();
        this.ID = "hiyoko1";
        this.image = new Polygon("hiyoko", 0);
        canvas.setTarget(this.image);
    }
}