import {messenger} from './messaenger.js';


export class gameObject {
    constructor(id) {
        this.ID = id;

        let obj = messenger.objHash[this.ID];
        if(obj == undefined){
            messenger.objHash[this.ID] = this;
        }
        else{
            this.ID = this.ID + "_";
            messenger.objHash[this.ID] = this;
        }
    }
    process(){

    }
    receive(message){

    }
    send(message){
        messenger.receive(message);
    }
    dead(){
        this.destructor();
        messenger.remove(this.ID);
    }
    destructor(){

    }
    getID(){
        return this.ID;
    }
}