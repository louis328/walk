import {canvas} from '../canvas.js';
import {gameObject} from '../gameObject.js';
import { Text } from '../text.js';
import {GameScene} from './scene_game.js';
import {messenger} from '../messaenger.js';

export class OpeningScene extends gameObject{
    constructor(){
        super("opening");

        this.opening = new Object();
        this.opening.time = 70;
        this.opening.text = new Text("🐤 × 3",-100,0);
        canvas.blackOut = 1.0;
    }

    process(){
        if(this.opening.time == 0){
            let container = messenger.getObject("container");
            if(container != null){
                console.log(container.id);
                this.dead();
                let game = new GameScene(container);
            }
        }
        else{
            --this.opening.time;
        }
    }
    destructor(){
        this.opening.text.dead();
        canvas.blackOut = 0.0;
    }
    
}