import {gameObject} from '../gameObject.js';
import {keyManager} from '../keyManager.js';
import {Polygon} from '../polygon.js';
import {GameScene} from './scene_game.js';

export class TitleScene extends gameObject{
    constructor(){
        super();

        this.image = new Polygon("title", 2);
        
    }

    process(){
        if(keyManager.getKeyState(87)){
            this.dead();
            let game = new GameScene();
        }
    }
}