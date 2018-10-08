import {canvas} from './canvas.js';
import {messenger} from './messaenger.js';
import {Hiyoko} from './hiyoko.js';
import {Blocks} from './blocks.js';
import {keyManager} from './keyManager.js';

onload = function(){
  document.getElementById('message').innerHTML = "onload";

  let hiyoko = new Hiyoko();
  let blocks = new Blocks();

  (function func (){
    keyManager.process();
    messenger.process();
    canvas.process();
    setTimeout(func, 1000 / 30);
  })();
}