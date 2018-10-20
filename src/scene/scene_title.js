import {gameObject} from '../gameObject.js';
import {keyManager} from '../keyManager.js';
import {Polygon} from '../polygon.js';
import {GameScene} from './scene_game.js';

export class TitleScene extends gameObject{
    constructor(){
        super('scene_title');

        this.image = new Polygon("title", 2);
        this.actionMap = new Object();
    }

    process(){
        if(this.actionMap['on'] == true || keyManager.getKeyState(87)){
            this.dead();
            let game = new GameScene();
        }
    }

    receive(mes){
        let message = mes['message'];

        if(message === 'button_on'){
            this.actionMap['on'] = true;
        }

    }
}