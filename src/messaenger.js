
class Messenger {
    constructor() {
        this.messageQueue = new Array();//メッセージキュー
        this.objHash = new Object();//ゲームオブジェクトの連想配列
    }
    process(){
        for(let ID in this.objHash){
            let obj = this.objHash[ID];
            obj.process();
        }
        while(this.messageQueue.length != 0){
            let message = this.messageQueue.shift();
            //console.log(message);
            for(let ID in this.objHash){
                let obj = this.objHash[ID];
                obj.receive(message);
            }
        }
    }
    receive(message){
        this.messageQueue.push(message);
    }
    express(message){
        //すぐに結果を返す
        if( message['toID'] == undefined){
            return null;
        }
        let ID = message['toID'];
        let target = this.objHash[ID];
        if(target == undefined || target == null){
            return null;
        }
        //console.log("send: " + message);
        let reply = target.receive(message);
        return reply;
    }
    remove(id){
        if(this.objHash[id] != undefined){
            delete this.objHash[id];
        }
    }
}
export const messenger = new Messenger();