import {messenger} from './messaenger.js';


export class gameObject {
    constructor() {
        this.ID = "";
    }
    receive(message){

    }
    send(message){
        messenger.receive(message);
    }
    getID(){
        return this.ID;
    }
}