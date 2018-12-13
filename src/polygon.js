import {canvas} from './canvas.js';
import * as shader from "./shader.js";

export const DRAW_LV_GUI = 0;
export const DRAW_LV_EXTERIOR = 1;


export const DRAW_LV_OBJ_FRONT = 4;

export const DRAW_LV_PLAYER = 6;

export const DRAW_LV_ITEM = 8;

export const DRAW_LV_OBJ_BACK = 10;

export const DRAW_LV_BACKGROUND = 12;

export class Polygon {
    constructor(name, level){
        this.name = name;
        this.level = level;
        this.invisible = false;

        this.rotate = 0;
        this.scaleX = 1.0;
        this.scaleY = 1.0;
        this.x = 0;
        this.y = 0;
        this.width = canvas.getTexture(this.name).width;
        this.height = canvas.getTexture(this.name).height;

        this.vertex_position = //3*4
		[
			-1.0, 1.0, 0.0,
			1.0, 1.0, 0.0,
			-1.0, -1.0, 0.0,
			1.0, -1.0, 0.0
        ];
        this.vertex_index = 
		[
			0,2,1, 1,2,3
        ];
        this.textureCoord = 
		[
            0,1,2,3
        ];
        this.uvArray = 
		[
            0,0, 1,0, 0,1, 1,1
		];
        this.vertices = this.vertex_position.length;
        this.indices = 	this.vertex_index.length;
        var gl = canvas.getGL();
        this.pos_vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.pos_vbo);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertex_position), gl.DYNAMIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        this.tex_vbo = shader.create_vbo(gl, this.textureCoord);
        this.VBOList = [this.pos_vbo, this.tex_vbo];
        this.IBO = shader.create_ibo(gl, this.vertex_index);
        this.deadFlag = false;
        canvas.putImage(this);
    }
    dead(){
        this.deadFlag = true;
    }
    isDead(){
        return this.deadFlag;
    }
    getIndices(){
        return this.indices;
    }
    getVBO(){
		return this.VBOList;
	}
	getIBO(){
		return this.IBO;
    }
    getTextureName(){
        return this.name;
    }
    getLevel(){
        return this.level;
    }
    getInvisible(){
        return this.invisible;
    }

    getPosition(){
        return {"x":this.x, "y":this.y};
    }
    setPosition(x,y){
        this.x = x;
        this.y = y;
    }
    addPosition(x,y){
        this.x += x;
        this.y += y;
    }
    getScale(){
        return {"x":this.scaleX, "y":this.scaleY};
    }
    setScale(x,y){
        this.scaleX = x;
        this.scaleY = y;
    }
    getRotate(){
        return this.rotate;
    }
    setRotate(r){
        this.rotate = r;
    }
    getUVArray(){
        return this.uvArray;
    }
    setUVArray(uv){
        this.uvArray = uv;
    }
    setPxToUVArray(startX,startY, endX,endY){//ピクセル値→UV値(0~1)
        this.scaleX = Math.abs(endX - startX) / this.width;
        this.scaleY = Math.abs(endY - startY) / this.height;
        this.uvArray = [
            startX / this.width, startY / this.height, 
            endX / this.width, startY / this.height, 
            startX / this.width,endY / this.height, 
            endX / this.width ,endY / this.height
        ];
    }
    setPxToUVArrayReverse(startX,startY, endX,endY){//左右反転
        this.scaleX = (endX - startX) / this.width;
        this.scaleY = (endY - startY) / this.height;
        this.uvArray = [
            startX / this.width, startY / this.height, 
            endX / this.width, startY / this.height, 
            startX / this.width,endY / this.height, 
            endX / this.width ,endY / this.height
        ];
    }
};