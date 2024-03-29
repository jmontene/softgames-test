import GameState from "GameStates/gameState.js";
import Button from "Utils/button.js";
import * as AssetsRepository from "Utils/assetsRepository.js";
import * as PIXI from 'pixi.js';

export default class MainMenu extends GameState{
    constructor(game){
        super(game);
        this.name = "MainMenu";

        this.titleText = new PIXI.Text("Main Menu");
        this.titleText.position.set(window.innerWidth/2,window.innerHeight/2 - 150);
        this.titleText.anchor.set(0.5,0.5);
        this.scene.addChild(this.titleText);

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
        this.toolButton.position.set(window.innerWidth/2,window.innerHeight/2 - 50);
        this.scene.addChild(this.toolButton);

        this.fireButton = new Button({
            "normal" : AssetsRepository.FromAtlas('mainAtlas', 'button_normal.png'),
            "over" : AssetsRepository.FromAtlas('mainAtlas', 'button_over.png'),
            "pressed" : AssetsRepository.FromAtlas('mainAtlas', 'button_pressed.png')
        }, "Fire");
        this.fireButton.addCallback(this.onFireButtonPressed, this);
        this.fireButton.position.set(window.innerWidth/2,window.innerHeight/2);
        this.scene.addChild(this.fireButton);
    }

    onCardButtonPressed(){
        this.game.transitionToState('StateCards');
    }

    onToolButtonPressed(){
        this.game.transitionToState('StateTextTool');
    }

    onFireButtonPressed(){
        this.game.transitionToState('StateFire');
    }
}