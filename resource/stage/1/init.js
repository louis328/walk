
import {Container, stageManager} from '../../../src/stageManager.js';
import {Block} from '../../../src/blocks.js';
import {Tiara, Star} from '../../../src/stars.js';

class Container1 extends Container{
    constructor(){
        super();
        this.id = "yeah";

        this.blocks.push(new Block(-60, 0));
        this.blocks.push(new Block(300, -225));
        this.blocks.push(new Block(150, -225));
        this.blocks.push(new Block(-150, 20));
        this.blocks.push(new Block(0, -230));
        this.blocks.push(new Block(-150, -210));
        
        for(let i=0;i<16;++i){
            this.blocks.push(new Block(64*i - 450, -300));
        }
        this.blocks.push(new Block(-310, -270));
        
        for(let i=0;i<7;++i){
            this.blocks.push(new Block(-450, 130 - 66*i));
            this.blocks.push(new Block( 450, 130 - 66*i));
        }

        this.stars.push(new Star(60, -100));
        this.stars.push(new Star(140, -100));
        this.stars.push(new Star(220, -100));

        this.stars.setTiara(new Tiara(-200, -100));
    }
}
stageManager.setInitFunc(1, () => {let container = new Container1();});
