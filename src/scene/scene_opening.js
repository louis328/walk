import {canvas} from '../canvas.js';
import {gameObject} from '../gameObject.js';
import { Text } from '../text.js';
import {GameScene} from './scene_game.js';

export class OpeningScene extends gameObject{
    constructor(){
        super();
        this.opening = new Object();
        this.opening.time = 70;
        this.opening.text = new Text("× 3",0,0);
        canvas.blackOut = 1.0;
    }

    process(){
        --this.opening.time;
        if(this.opening.time == 0){
            this.dead();
        }
    }
    destructor(){
        this.opening.text.dead();
        canvas.blackOut = 0.0;
        let game = new GameScene();
    }
}