import {canvas, CANVAS_WIDTH, CANVAS_HEIGHT, PC_MODE} from './canvas.js';
import {messenger} from './messaenger.js';
import {Hiyoko} from './hiyoko.js';
import {Blocks} from './blocks.js';
import {keyManager} from './keyManager.js';
import { ButtonController } from './button.js';
import { Exterior } from './exterior.js';

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
  while(!canvas.loaded()){

  }
  let hiyoko = new Hiyoko();
  let blocks = new Blocks();
  let buttonController  = null;
  if(!PC_MODE){
    buttonController = new ButtonController();
    let exterior = new Exterior();
  }
  
  (function func (){
    keyManager.process();
    messenger.process();
    canvas.process();
    setTimeout(func, 1000 / 30);//fps30
  })();
}