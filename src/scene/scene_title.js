import {gameObject} from '../gameObject.js';
import {keyManager} from '../keyManager.js';
import * as polygon from '../polygon.js';
import {OpeningScene} from './scene_opening.js';
import { Text } from '../text.js';
import { stageManager } from '../stageManager.js';

export class TitleScene extends gameObject{
    constructor(){
        super('scene_title');

        this.thumbnailArray = new Array();
        for(let stage of stageManager.stages){
            let image = new polygon.Polygon(stage.getID(), polygon.DRAW_LV_OBJ_FRONT);

            this.thumbnailArray.push(image);
        }
        //this.titleImage = new Polygon("title", 2);
        this.actionMap = new Object();
        this.waitTime = 5;

        this.selectStage = 1;
        this.selectStageText = new Text("1",-30,140);
        this.selectedTime = 0;

        this.moveThumbnail();
    }

    process(){
        this.moveThumbnail();
        this.selectStageText.text = this.selectStage;
        if(this.selectedTime > 0){
            this.selectedTime -= 1;
        }
        if(this.waitTime > 0){
            --this.waitTime;
        }
        else{
            if(this.actionMap['on'] == true){
                this.dead();
                stageManager.initStage(this.selectStage);
                let game = new OpeningScene();
            }
        }
        
    }
    moveThumbnail(){
        let length = this.thumbnailArray.length;
        for(let i=0;i<length;++i){
            let image = this.thumbnailArray[i];
            image.x = i * 200 - 200;
            if(this.selectStage == i+1){
                image.y = 50;
            }
            else{
                image.y = 0;
            }
        }
    }
    receive(mes){
        let message = mes['message'];

        if(message === 'button_on'){
            this.actionMap['on'] = true;
        }
        else if(message === 'button_right'){
            if(this.selectedTime == 0){
                this.selectedTime = 8;
                this.selectStage +=  1;
                if(this.selectStage > this.thumbnailArray.length){
                    this.selectStage = 1;
                }
            }
        }
        else if(message === 'button_left'){
            if(this.selectedTime == 0){
                this.selectedTime = 8;
                this.selectStage -=  1;
                if(this.selectStage < 1){
                    this.selectStage = this.thumbnailArray.length;
                }
            }
        }
    }
    destructor(){
        for(let image of this.thumbnailArray){
            image.dead();
        }
        this.selectStageText.dead();
    }
}