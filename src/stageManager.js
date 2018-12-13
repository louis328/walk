import {canvas} from './canvas.js';
import {Blocks} from './blocks.js';
import {Stars} from './stars.js';
import {gameObject} from './gameObject.js';

export class Container extends gameObject{
    constructor(){
        super("container");console.log("container");
        this.id = "";
        this.blocks = new Blocks();
        this.stars = new Stars();
    }
    destructor(){
        this.blocks.dead();
        this.stars.dead();
    }
}

class Stage{
    constructor(id, number){
        this.id = id;
        this.number = number;
    }
    getID(){
        return this.id;
    }
    getNumber(){
        return this.number;
    }
}
export class StageManager{
    constructor(){
        this.stages = new Array();
        this.initFuncMap = new Object();
    }
    init(){
        let STAGE_MAX = 10;
        let existNumbers = new Array();
        let path = "./resource/stage/";
        for(let i=1;i<=STAGE_MAX;++i){
            let req = new XMLHttpRequest();
            req.onreadystatechange = function(){
                if(req.readyState === 4){
                    //console.log(req.status);
                    if(req.status === 200){
                        existNumbers.push(i);
                    }
                    else{
                        existNumbers.push(-1);
                    }
                }   
            };
            req.open("GET",path + i + "/thumbnail.png",false);
            
            req.send(null);
        }
        for(let number of existNumbers){
            if(number !== -1){
                let id = "thumbnail" + number;
                let initPath = path + number + "/init.js";
                canvas.createTexture(path + number+ "/thumbnail.png", id);
                this.loadScript(initPath);
                this.stages.push(new Stage(id, number));
            }
        }
    }
    initStage(id){
        this.initFuncMap[id]();
    }
    setInitFunc(id, func){
        this.initFuncMap[id] = func;
    }
    loadScript(url) {
        let script = document.createElement('script');
        script.type = "module";
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script); 
        
        let done = false;
        script.onload = script.onreadystatechange = function() {
            if ( !done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") ) {
                done = true;
                script.onload = script.onreadystatechange = null;
                if ( script.parentNode ) {
                    document.getElementsByTagName('head')[0].removeChild( script );
                }
            }
        };
      }
}
export const stageManager = new StageManager();