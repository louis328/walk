import {gameObject} from '../gameObject.js';
import {Hiyoko} from '../hiyoko.js';
import {Blocks} from '../blocks.js';
import {Stars} from '../stars.js';
import { TitleScene } from './scene_title.js';
import { Text } from '../text.js';
import { Polygon} from '../polygon.js';

export class GameScene extends gameObject{
    constructor(){
        super('scene_game');
        this.actionMap = new Object();

        this.hiyoko = new Hiyoko();
        this.blocks = new Blocks();
        this.stars = new Stars();

        this.time = 0;
        this.timeText = new Text("0",-380,300);
        this.result = null;
    }
    process(){
        if(this.result != null){
            --this.result.time;
            if(this.result.time == 170){
                let text = new Text("time " + ((this.time / 30).toFixed(2)),-180,40);
                this.result.texts.push(text);
            }
            else if(this.result.time == 140){
                let text = new Text("miss " + 0,-180,-20);
                this.result.texts.push(text);
            }
            else if(this.result.time == 100){
                let text = new Text("to be continued...",-100,-90);
                text.size = "40px";
                this.result.texts.push(text);
            }
            else if(this.result.time == 0){
                this.dead();
            }
        }
        else{
            ++this.time;
            this.timeText.text = "" + Math.floor(this.time / 30);
        }
        
    }
    receive(mes){
        let message = mes['message'];
        if(message === 'clear'){console.log("clear!");
            this.result = new Object();
            this.result.time = 7*30;
            this.result.image = new Polygon("result", 5);
            this.result.texts = new Array();
            let text = new Text("result",-65,110);
            this.result.texts.push(text);
        }
    }
    destructor(){
        this.result.image.dead();
        for(let text of this.result.texts){
            text.dead();
        }
        this.blocks.dead();
        this.hiyoko.dead();
        this.stars.dead();
        this.timeText.dead();
        let title = new TitleScene();
    }
}