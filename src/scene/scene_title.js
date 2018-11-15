import {gameObject} from '../gameObject.js';
import {keyManager} from '../keyManager.js';
import {Polygon} from '../polygon.js';
import {OpeningScene} from './scene_opening.js';

export class TitleScene extends gameObject{
    constructor(){
        super('scene_title');

        this.titleImage = new Polygon("title", 2);
        this.actionMap = new Object();
    }

    process(){
        if(this.actionMap['on'] == true || keyManager.getKeyState(87)){
            this.dead();
            let game = new OpeningScene();
        }
    }

    receive(mes){
        let message = mes['message'];

        if(message === 'button_on'){
            this.actionMap['on'] = true;
        }

    }
    destructor(){
        this.titleImage.dead();
    }
}