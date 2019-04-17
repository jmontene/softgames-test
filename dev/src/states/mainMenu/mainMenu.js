import GameState from "GameStates/gameState.js";
import Button from "Utils/button.js";
import * as AssetsRepository from "Utils/assetsRepository.js";

export default class MainMenu extends GameState{
    constructor(){
        super();
        this.name = "MainMenu";

        this.cardButton = new Button({
            "normal" : AssetsRepository.FromAtlas('mainAtlas', 'button_normal.png'),
            "over" : AssetsRepository.FromAtlas('mainAtlas', 'button_over.png'),
            "pressed" : AssetsRepository.FromAtlas('mainAtlas', 'button_pressed.png')
        }, "Cards");
        this.cardButton.addCallback(this.onCardButtonPressed, this);
        this.cardButton.position.set(window.innerWidth/2,window.innerHeight/2 - 100);
        this.scene.addChild(this.cardButton);

        this.toolButton = new Button({
            "normal" : AssetsRepository.FromAtlas('mainAtlas', 'button_normal.png'),
            "over" : AssetsRepository.FromAtlas('mainAtlas', 'button_over.png'),
            "pressed" : AssetsRepository.FromAtlas('mainAtlas', 'button_pressed.png')
        }, "TextTool");
        this.toolButton.addCallback(this.onToolButtonPressed, this);
        this.toolButton.position.set(window.innerWidth/2,window.innerHeight/2);
        this.scene.addChild(this.toolButton);
    }

    onCardButtonPressed(){
        this.game.transitionToState('StateCards');
    }

    onToolButtonPressed(){
        this.game.transitionToState('StateTextTool');
    }
}