import {gameObject} from './gameObject.js';
import {canvas} from './canvas.js';
import {Polygon} from './polygon.js';

class Block{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.halfWidth = 32;
        this.halfHeight = 32;
        this.image = new Polygon("block", 7);
        canvas.setTarget(this.image);
        this.image.setPosition(this.x, this.y);
    }
}
export class Blocks extends gameObject{
    constructor(){
        super("blocks");
        this.blocks = new Array();
        this.blocks.push(new Block(60, 0));
        this.blocks.push(new Block(300, -225));
        this.blocks.push(new Block(150, -201));
        this.blocks.push(new Block(-150, -50));
        this.blocks.push(new Block(0, -230));
        this.blocks.push(new Block(-150, -210));
        
        for(let i=0;i<16;++i){
            this.blocks.push(new Block(64*i - 450, -300));
        }
        this.blocks.push(new Block(-230, -330));
        this.blocks.push(new Block(-310, -270));
    }
    process(){

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
                    /*mes['x'] = ret['x'];
                    mes['y'] = ret['y'];
                    a_top = mes['y'] + mes['harfH'];
                    a_bottom = mes['y'] - mes['harfH'];
                    a_right = mes['x'] + mes['halfW'];
                    a_left = mes['x'] - mes['halfW'];*/ 
                    ret['result'] = true;
                    
                }
            }
            return ret;
        }
        
    }
}
