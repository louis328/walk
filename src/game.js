import {canvas, CANVAS_WIDTH, CANVAS_HEIGHT, PC_MODE} from './canvas.js';
import {messenger} from './messaenger.js';
import { stageManager } from './stageManager.js';
import {keyManager} from './keyManager.js';
import { ButtonController } from './button.js';
import { Exterior } from './exterior.js';
import { TitleScene } from './scene/scene_title.js';

onload = function(){
  document.documentElement.addEventListener('touchstart', function (e) {
    for(let i=0;i<e.changedTouches.length;++i){
      let touch = e.changedTouches[i];
      let x = touch.pageX - CANVAS_WIDTH/2;
      let y = CANVAS_HEIGHT/2 - touch.pageY;
      let message = new Object();
      message['x'] = x;
      message['y'] = y;
      message['identifier'] = touch.identifier;
      message['message'] = 'touchStart';
      messenger.receive(message);
    }
    e.preventDefault();
  }, {passive: false});
  document.documentElement.addEventListener('touchmove', function (e) {
    for(let i=0;i<e.changedTouches.length;++i){
      let touch = e.changedTouches[i];
      let x = touch.pageX - CANVAS_WIDTH/2;
      let y = CANVAS_HEIGHT/2 - touch.pageY;
      let message = new Object();
      message['x'] = x;
      message['y'] = y;
      message['identifier'] = touch.identifier;
      message['message'] = 'touchMove';
      messenger.receive(message);
    }
    e.preventDefault();
  }, {passive: false});
  document.documentElement.addEventListener('touchend', function (e) {
    for(let i=0;i<e.changedTouches.length;++i){
      let touch = e.changedTouches[i];
      let x = touch.pageX - CANVAS_WIDTH/2;
      let y = CANVAS_HEIGHT/2 - touch.pageY;
      let message = new Object();
      message['x'] = x;
      message['y'] = y;
      message['identifier'] = touch.identifier;
      message['message'] = 'touchEnd';
      messenger.receive(message);
    }
    e.preventDefault();
  }, {passive: false});
  
  stageManager.init();//画像のロードがある場合はループ前に初期化
  
  let loaded = false;
  (function func (){
    if(canvas.getLoadingCount() === 0){
      if(loaded){
        keyManager.process();
        messenger.process();
        canvas.process();
      }
      else{
        loaded = true;
        let title = new TitleScene();
        if(!PC_MODE){
          let buttonController = new ButtonController();
          let exterior = new Exterior();
        }
      }
    }
    
    setTimeout(func, 1000 / 30);//fps30
  })();
}