import {gameObject} from './gameObject.js';
import {canvas} from './canvas.js';
import * as polygon from './polygon.js';

export class Block{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.halfWidth = 32;
        this.halfHeight = 32;
        this.image = new polygon.Polygon("block", polygon.DRAW_LV_OBJ_BACK);
        this.image.setPosition(this.x, this.y);
    }
    dead(){
        this.image.dead();
    }
}
export class Blocks extends gameObject{
    constructor(){
        super("blocks");
        this.blocks = new Array();

    }
    process(){

    }
    push(block){
        this.blocks.push(block);
    }
    receive(mes){
        //console.log("receive: " + mes);
        if(mes['message'] === "collision"){
            let ret = new Object();
            ret['result'] = false;
            ret['landing'] = false;//着地判定
            ret['x'] = mes['x'];
            ret['y'] = mes['y'];
            let a_top = mes['y'] + mes['halfH'];
            let a_bottom = mes['y'] - mes['halfH'];
            let a_right = mes['x'] + mes['halfW'];
            let a_left = mes['x'] - mes['halfW'];    
            let p_top = mes['preY'] + mes['halfH'];
            let p_bottom = mes['preY'] - mes['halfH'];
            let p_right = mes['preX'] + mes['halfW'];
            let p_left = mes['preX'] - mes['halfW'];       
            for(let block of this.blocks){
                let b_top = block.y + block.halfHeight;
                let b_bottom = block.y - block.halfHeight;
                let b_right = block.x + block.halfWidth;
                let b_left = block.x - block.halfWidth;
                if(a_bottom < b_top && a_top > b_bottom && a_left < b_right && a_right > b_left){
                    if(p_bottom < b_top){
                        if(!(p_left < b_right) || !(p_right > b_left)){
                            if(mes['vecX'] == 1){
                                //右向きに衝突
                                ret['x'] = mes['x'] - (a_right - b_left);
                            }
                            else{
                                //左向きに衝突
                                ret['x'] = mes['x'] + (b_right - a_left);
                            }
                        }
                    }
                    ret['result'] = true;
                    a_top = ret['y'] + mes['halfH'];
                    a_bottom = ret['y'] - mes['halfH'];
                    a_right = ret['x'] + mes['halfW'];
                    a_left = ret['x'] - mes['halfW'];   
                }
            }
            for(let block of this.blocks){
                let b_top = block.y + block.halfHeight;
                let b_bottom = block.y - block.halfHeight;
                let b_right = block.x + block.halfWidth;
                let b_left = block.x - block.halfWidth;
                if(a_bottom < b_top && a_top > b_bottom && a_left < b_right && a_right > b_left){
                    if(!(p_bottom < b_top && p_top > b_bottom)){
                        //console.log(" 縦向きに衝突");
                        if(mes['vecY'] == 1){
                            //上向きに衝突
                            ret['y'] = mes['y'] - (a_top - b_bottom);
                        }
                        else{
                            //下向きに衝突(着地)
                            ret['y'] = mes['y'] + (b_top - a_bottom);
                            ret['landing'] = true;
                        }
                    }

                    ret['result'] = true;
                    a_top = ret['y'] + mes['halfH'];
                    a_bottom = ret['y'] - mes['halfH'];
                    a_right = ret['x'] + mes['halfW'];
                    a_left = ret['x'] - mes['halfW'];   
                }
            }
            return ret;
        }
    }
    destructor(){
        for(let block of this.blocks){
            block.dead();
        }
    }
}
