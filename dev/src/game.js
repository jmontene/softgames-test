import Dust from 'pixi-dust';
import * as PIXI from 'pixi.js';

export default class Game{
    constructor(app){
        this.app = app;
        this.state = undefined;
        this.states = new Map();
        this.dust = new Dust(PIXI);
    }

    start(states, initialState){
        for(let state of states){
            state.game = this;
            this.app.stage.addChild(state.scene);
            this.states.set(state.name, state);
        }

        this.state = this.states.get(initialState);

        this.state.scene.visible = true;
        this.state.onEnter();

        this.app.ticker.add(delta => this.gameLoop(delta));
    }

    gameLoop(delta){
        this.state.update(delta);
        this.dust.update();
    }

    transitionToState(stateKey){
        this.state.onExit();
        this.state.scene.visible = false;

        this.state = this.states.get(stateKey);

        this.state.scene.visible = true;
        this.state.onEnter();
    }

    elapsedMS(){
        return this.app.ticker.elapsedMS;
    }

    fps(){
        return this.app.ticker.FPS;
    }
}