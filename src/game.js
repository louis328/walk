import {canvas, CANVAS_WIDTH, CANVAS_HEIGHT, PC_MODE} from './canvas.js';
import {messenger} from './messaenger.js';
import {Hiyoko} from './hiyoko.js';
import {Blocks} from './blocks.js';
import {keyManager} from './keyManager.js';
import { ButtonController } from './button.js';

onload = function(){

  document.documentElement.addEventListener('touchstart', function (e) {
    let x = e.changedTouches[0].pageX - CANVAS_WIDTH/2;
    let y = CANVAS_HEIGHT/2 - e.changedTouches[0].pageY;
    let message = new Object();
    message['x'] = x;
    message['y'] = y;
    message['message'] = 'touchStart';
    messenger.receive(message);
    e.preventDefault();
  }, {passive: false});
  document.documentElement.addEventListener('touchmove', function (e) {
    e.preventDefault();
  }, {passive: false});
  
  let hiyoko = new Hiyoko();
  let blocks = new Blocks();
  let buttonController  = null;
  if(!PC_MODE){
    buttonController = new ButtonController();
  }

  (function func (){
    keyManager.process();
    messenger.process();
    canvas.process();
    setTimeout(func, 1000 / 30);
  })();
}