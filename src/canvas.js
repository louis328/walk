import {Shader, set_attribute} from './shader.js';
import {messenger} from './messaenger.js';
import {qtLIB, matLIB} from './minMatrix.js';

export const PC_MODE = ( window.innerHeight < window.innerWidth*1.3 ) ? (true) : false;
const SIDE_LENGTH = ( window.innerWidth <  window.innerHeight) ? (window.innerHeight) : window.innerWidth;
export const PLAY_WIDTH = 900;
export const PLAY_HEIGHT = 675;
const VIEWPORT_WIDTH = ( PC_MODE ) ? (PLAY_WIDTH) : SIDE_LENGTH;
const VIEWPORT_HEIGHT = ( PC_MODE ) ? (PLAY_WIDTH) : SIDE_LENGTH;
export const CANVAS_WIDTH = ( PC_MODE ) ? (PLAY_WIDTH) : window.innerWidth;
export const CANVAS_HEIGHT = ( PC_MODE ) ? (PLAY_HEIGHT) : window.innerHeight;

class Canvas {
  constructor() {
    //console.log(document.body.scroll);
    //document.getElementById('message').innerHTML = "<div>"+window.innerWidth + ":" + window.innerHeight+"</div>";
    //document.getElementById('message').innerHTML += "<div>"+CANVAS_WIDTH + ":" + CANVAS_HEIGHT+"</div>";
    try {
      this.canvas = document.getElementById('mainCanvas');
      this.canvas.width = CANVAS_WIDTH;
      this.canvas.height = CANVAS_HEIGHT;
      this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
      if (!(window.WebGLRenderingContext && this.gl && this.gl.getShaderPrecisionFormat)) {
        console.log("webgl非対応 1");
        return false;
      }
    } catch (e) {
      console.log("webgl非対応 2: " + e);
      return false;
    }
    let canvas_2d = document.getElementById("frontCanvas");
    canvas_2d.width = CANVAS_WIDTH;
    canvas_2d.height = CANVAS_HEIGHT;
    this.context_2d = canvas_2d.getContext("2d");

    this.gl.viewport(0, 0, VIEWPORT_WIDTH,VIEWPORT_HEIGHT);//800*800のビューポートを上下100カット表示で使う
    this.texture = {};
    this.texHash = {};
    this.texCounter = 0;
    this.texHashSize = 0;
    this.drawTargets = new Array();//描画するオブジェクトを格納
    this.shader = new Shader(this.gl);
    this.blackOut = 0.0;
    this.textArray = new Array();//描画するテキストを格納

    this.canvas.addEventListener('click', this.onClick, false);
    //document.getElementById('message').innerHTML = "webGL 初期化完了";
    this.loadingCount = 0;
    this.loadComplete = false;
  }
  onClick(e){
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left - CANVAS_WIDTH*0.5;
    var y = -(e.clientY - rect.top - CANVAS_HEIGHT*0.5);
    //g_gameData.clickOn(x,y);
    console.log(x+", " + y);
  }
  //初期化
  init() {
    //カリング有効化
    this.gl.enable(this.gl.CULL_FACE);
    // 深度テストを有効にする
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    this.gl.depthFunc(this.gl.LEQUAL);
    this.gl.activeTexture(this.gl.TEXTURE0);

    this.openTexture("./resource/image.json");

    this.context_2d.font = "50px 'ＭＳ Ｐゴシック'";
    
   
  }
  //外部から呼び出すメソッド
  process(){
    this.start();
    this.draw();
    this.end();
    this.context_2d.clearRect(CANVAS_WIDTH*0.5-PLAY_WIDTH*0.5, CANVAS_HEIGHT*0.5 - canvas.getHeightDifference() - PLAY_HEIGHT*0.5, PLAY_WIDTH, PLAY_HEIGHT);
    this.context_2d.fillStyle = "rgba(0,0,0," + (this.blackOut) + ")";
    this.context_2d.fillRect(CANVAS_WIDTH*0.5-PLAY_WIDTH*0.5, CANVAS_HEIGHT*0.5 - canvas.getHeightDifference() - PLAY_HEIGHT*0.5, PLAY_WIDTH, PLAY_HEIGHT);
    for(let text of this.textArray){
      this.context_2d.fillStyle = text.color;
      this.context_2d.font = text.size + " 'ＭＳ Ｐゴシック'";
      this.context_2d.fillText(text.text, CANVAS_WIDTH*0.5 + text.x, CANVAS_HEIGHT*0.5 -text.y - canvas.getHeightDifference());
    }
    
  }
  //ループ頭
  start() {
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.clearDepth(1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

  }
  //描画
  draw() {
    this.gl.useProgram(this.shader.getPrg());

    let layerList = new Array();
    for (var i = 0; i < 20; ++i) {
      layerList.push(new Array());
    }

    for (let i = this.drawTargets.length-1; i >= 0; i--) {
      let target = this.drawTargets[i];
      if(target.getInvisible() == true){continue;}
      else if(target.isDead()){
        this.drawTargets.splice(i,1);
      }
      layerList[target.getLevel()].push(target);
    }
    for (var i = (layerList.length-1); i >= 0; --i) {
      var array = layerList[i];
      for (var j = 0; j < array.length; ++j) {
        var target = array[j];
        this.drawTarget(target);
      }
    }
  }
  drawTarget(target, level){
    var texture = this.texture[this.texHash[target.getTextureName()]];
    if (texture != null) {
      var mMatrix = matLIB.identity(matLIB.create());
      matLIB.identity(mMatrix);
      let draw_x = (target.getPosition().x - (VIEWPORT_WIDTH - CANVAS_WIDTH) / 2) / VIEWPORT_WIDTH * 2;
      let draw_y = (target.getPosition().y - (VIEWPORT_HEIGHT - CANVAS_HEIGHT) / 2) / VIEWPORT_HEIGHT * 2;
      if(!PC_MODE){
        draw_y += this.getHeightDifference() / VIEWPORT_HEIGHT * 2;
      }
      matLIB.translate(mMatrix, [draw_x, draw_y, 0], mMatrix);

      matLIB.rotate(mMatrix, target.getRotate() , [0, 0, 1], mMatrix);
      let scaleX = 1.0 * texture.width / VIEWPORT_WIDTH * target.getScale().x;
      let scaleY = 1.0 * texture.height / VIEWPORT_HEIGHT * target.getScale().y;
      matLIB.scale(mMatrix, [scaleX, scaleY, 1.0], mMatrix);
      


      this.shader.setMatrix(mMatrix);
      this.shader.setUV(target.getUVArray());

      this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
      set_attribute(this.gl, target.getVBO(), this.shader.getLoc(), this.shader.getStr());
      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, target.getIBO());
      this.gl.drawElements(this.gl.TRIANGLES, target.getIndices(), this.gl.UNSIGNED_SHORT, 0);
    }
  }
  getHeightDifference(){
    if(!PC_MODE){
      //return  (CANVAS_HEIGHT/4 - (VIEWPORT_HEIGHT - CANVAS_HEIGHT) / 2);
      //return CANVAS_HEIGHT/2 - PLAY_HEIGHT/2 - 8;
      return PLAY_HEIGHT/2 + 40;
    }
    else{
      return 0;
    }
  }
  //ループ末
  end() {
    this.gl.flush();
    //g_gameData.clickOff();
  }
  openTexture(filepath) {
    let req = new XMLHttpRequest();
    req.onreadystatechange = function(){
      //console.log(req);
    };
    req.open("GET",filepath,false);
    req.send(null);
    //canvas.openTexture(req.responseText);
    let jsonTexture = req.responseText;
    let json = JSON.parse(jsonTexture);
    let array = json.images;
    //console.log(array);
    this.texHashSize = array.length;
    for (let i = 0; i < array.length; ++i) {
      let obj = array[i];
      this.createTexture(obj.path, obj.id);
    }
  }

  // テクスチャを生成する関数
  createTexture(source, name) {
    // イメージオブジェクトの生成
    var img = new Image();
    // イメージオブジェクトのソースを指定
    img.crossOrigin = 'anonymous';
    img.src = source;
    var gl = this.gl;
    var canvas = this;
    ++canvas.loadingCount;
    // データのオンロードをトリガーにする
    img.onload = function () {
      
      // テクスチャオブジェクトの生成
      var tex = gl.createTexture();
      tex.width = img.width;
      tex.height = img.height;
      //img = checkImageSize(img); 
      // テクスチャをバインドする
      gl.bindTexture(gl.TEXTURE_2D, tex);
      // テクスチャへイメージを適用.0
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      // ミップマップを生成
      gl.generateMipmap(gl.TEXTURE_2D);
      // テクスチャのバインドを無効化
      gl.bindTexture(gl.TEXTURE_2D, null);
      // 生成したテクスチャをグローバル変数に代入
      canvas.texture[canvas.texCounter] = tex;
      canvas.texHash[name] = canvas.texCounter;
      ++canvas.texCounter;
      --canvas.loadingCount;
      console.log("loadingCount:" + canvas.loadingCount);
    };
  }
  getTexture(name){
    let cnt = this.texHash[name];
    if(cnt != undefined){
      return this.texture[cnt];
    }
    else{
      return null;
    }
  }
  getGL() {
    return this.gl;
  }
  getLoadingCount(){
    return this.loadingCount;
  }
  putImage(polygon) {
    this.drawTargets.push(polygon);
  }
  isLoaded(){
    return this.loadComplete;
  }
  loaded(){
    //設定された画像数と読み込んだ画像数が一致するか否か
    //console.log(this.texCounter);
    return (this.texCounter == this.texHashSize);
  }
}
export const canvas = new Canvas();
canvas.init();