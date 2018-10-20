import {gameObject} from '../gameObject.js';
import {Hiyoko} from '../hiyoko.js';
import {Blocks} from '../blocks.js';

export class GameScene extends gameObject{
    constructor(){
        super('scene_game');
        this.actionMap = new Object();

        let hiyoko = new Hiyoko();
        let blocks = new Blocks();
    }


}