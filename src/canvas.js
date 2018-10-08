import {Shader, set_attribute} from './shader.js';
import {messenger} from './messaenger.js';
import {qtLIB, matLIB} from './minMatrix.js';
const VIEWPORT_WIDTH = 800;
const VIEWPORT_HEIGHT = 800;
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
class Canvas {
  constructor() {
    try {
      this.canvas = document.getElementById('canvas');
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
    //document.getElementById('message').innerHTML = "webGL 初期化成功";
    this.gl.viewport(0, -100, VIEWPORT_WIDTH,VIEWPORT_HEIGHT);//800*800のビューポートを上下100カット表示で使う
    this.texture = {};
    this.texHash = {};
    this.texCounter = 0;
    this.drawTargets = new Array();
    this.shader = new Shader(this.gl);

    this.canvas.addEventListener('click', this.onClick, false);
    //document.getElementById('message').innerHTML = "webGL 初期化完了";
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

    this.openTexture();
  }
  //外部から呼び出すメソッド
  process(){
    this.start();
    this.draw();
    this.end();
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
    var layerList = new Array();
    for (var i = 0; i < 20; ++i) {
      layerList.push(new Array());
    }

    for (var i = 0; i < this.drawTargets.length; ++i) {
      var target = this.drawTargets[i];
      if(target.getInvisible() == true){continue;}
      layerList[target.getLevel()].push(target);
    }
    for (var i = 19; i >= 0; --i) {
      var array = layerList[i];
      for (var j = 0; j < array.length; ++j) {
        var target = array[j];
        this.drawTarget(target);
      }
    }
  }
  drawTarget(target){
    var texture = this.texture[this.texHash[target.getTextureName()]];
    if (texture != null) {
      var mMatrix = matLIB.identity(matLIB.create());
      matLIB.identity(mMatrix);
      
      matLIB.translate(mMatrix, [target.getPosition().x / VIEWPORT_WIDTH * 2, (target.getPosition().y) / VIEWPORT_HEIGHT * 2, 0], mMatrix);

      matLIB.rotate(mMatrix, 0 , [0, 0, 1], mMatrix);
      matLIB.scale(mMatrix, [1.0 * texture.width / VIEWPORT_WIDTH * target.getScale().x, 1.0 * texture.height / VIEWPORT_HEIGHT * target.getScale().y, 1.0], mMatrix);
      


      this.shader.setMatrix(mMatrix);

      this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
      set_attribute(this.gl, target.getVBO(), this.shader.getLoc(), this.shader.getStr());
      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, target.getIBO());
      this.gl.drawElements(this.gl.TRIANGLES, target.getIndices(), this.gl.UNSIGNED_SHORT, 0);
    }
  }
  //ループ末
  end() {
    this.gl.flush();
    //g_gameData.clickOff();
  }
  openTexture(jsonTexture) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function(){
      //console.log(req);
    };
    req.open("GET","./src/data.json",false);
    req.send(null);
    //canvas.openTexture(req.responseText);
    jsonTexture = req.responseText;
    var json = JSON.parse(jsonTexture);
    var array = json.images;
    //console.log(array);
    for (var i = 0; i < array.length; ++i) {
      var obj = array[i];
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
      
    };
  }
  getGL() {
    return this.gl;
  }
  setTarget(polygon) {
    this.drawTargets.push(polygon);
  }
}
export const canvas = new Canvas();
canvas.init();