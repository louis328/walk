

class KeyManager{
    constructor() {
        document.keyManager = this;
        document.onkeydown = this.pressFunction;
        document.onkeyup = this.releaseFunction;
        this.keyState = new Object();
        this.keyPreState = new Object();

        this.keyJustDown = new Object();
        this.keyJustUp = new Object();
    }
    pressFunction(event){
        let keyCode = event.keyCode;
        //console.log("key press: " + keyCode);
        document.keyManager.keyState[keyCode] = true;
    }
    releaseFunction(event){
        let keyCode = event.keyCode;
        //console.log("key release: " + keyCode);
        document.keyManager.keyState[keyCode] = false;
    }
    process(){
        let state = document.keyManager.keyState;
        for(let k in state){
            let change = state[k] ^ this.keyPreState[k];
            this.keyJustDown[k] = change & state[k];
            this.keyJustUp[k] = change & !state[k];
            this.keyPreState[k] = state[k];
        }
    }
    getKeyState(key){
        return document.keyManager.keyState[key];
    }
    isKeyJustDown(key){
        return this.keyJustDown[key];
    }
    isKeyJustUp(key){
        return this.keyJustUp[key];
    }
}

export const keyManager = new KeyManager();