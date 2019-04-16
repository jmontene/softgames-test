export default class Game{
    constructor(app, states, initialState){
        this.app = app;
        this.state = initialState;
        this.states = new Map();
        for(let state of states){
            state.game = this;
            this.app.stage.addChild(state.scene);
            this.states.set(state.name, state);
        }

        this.state.scene.visible = true;
        this.state.onEnter();
    }

    gameLoop(delta){
        this.state.update(delta);
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