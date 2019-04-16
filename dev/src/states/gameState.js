import * as PIXI from "pixi.js";

export default class GameState{
    constructor(){
        this.game = undefined;
        this.scene = new PIXI.Container();
        this.scene.visible = false;
        this.name = "GameState";
    }

    onEnter(){}
    onExit(){}
    update(delta){}
}