import {canvas} from './canvas.js';
import {messenger} from './messaenger.js';
import {Hiyoko} from './hiyoko.js';
import {Blocks} from './blocks.js';
import {keyManager} from './keyManager.js';

onload = function(){

  document.documentElement.addEventListener('touchstart', function (e) {
    let x = e.changedTouches[0].pageX;
    let y = e.changedTouches[0].pageY;
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

  (function func (){
    keyManager.process();
    messenger.process();
    canvas.process();
    setTimeout(func, 1000 / 30);
  })();
}