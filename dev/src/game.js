export default class Game{
    constructor(app, states, initialState){
        this.app = app;
        this.state = initialState;
        for(let state of states){
            state.game = this;
            this.app.stage.addChild(state.scene);
        }

        this.state.scene.visible = true;
        this.state.onEnter();
    }

    gameLoop(delta){
        this.state.update(delta);
    }

    transitionToState(nextState){
        this.state.onExit();
        this.state.scene.visible = false;

        this.state = nextState;

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