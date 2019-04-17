import * as PIXI from "pixi.js";

export default class GameState{
    constructor(game){
        this.game = game;
        this.scene = new PIXI.Container();
        this.scene.visible = false;
        this.name = "GameState";
    }

    onEnter(){}
    onExit(){}
    update(delta){}
}