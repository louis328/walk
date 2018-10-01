import {canvas} from './canvas.js';
import {messenger} from './messaenger.js';
import {Hiyoko} from './hiyoko.js';

onload = function(){
  document.getElementById('message').innerHTML = "onload()";
  let hiyoko = new Hiyoko();
  (function func (){
    messenger.process();
    canvas.process();
    setTimeout(func, 1000 / 30);
  })();
}