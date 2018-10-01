
class Messenger {
    constructor() {
        this.messageQueue = new Array();//メッセージキュー
        this.objHash = new Object();//ゲームオブジェクトの連想配列
    }
    process(){
        for(let key in this.objHash){

        }
        while(this.messageQueue.length != 0){
            let message = this.messageQueue.shift();
            console.log(message);
        }
    }
    receive(message){
        this.messageQueue.push(message);
    }
}
export const messenger = new Messenger();