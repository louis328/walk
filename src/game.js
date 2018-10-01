import {canvas} from './canvas.js';
import {messenger} from './messaenger.js';

onload = function(){
    (function func (){
      messenger.process();
      canvas.process();
      setTimeout(func, 1000 / 30);
    })();
  }