import GameState from "GameStates/gameState.js";
import TextTool from "./textTool.js";
import Button from "Utils/button.js";
import * as AssetsRepository from "Utils/assetsRepository.js";

export default class StateTextTool extends GameState{
    constructor(game){
        super(game);
        this.name = "StateTextTool";
        this.changeTime = 0;

        this.texts = [
            "Good",
            "Bad",
            "Great",
            "Red",
            "White",
            "Blue",
        ];

        this.minFontSize = 5;
        this.maxFontSize = 40;
        this.maxLength = 5;
        this.timeToChange = 2;

        this.possibleTextures = [
            AssetsRepository.FromAtlas('mainAtlas', 'checkmark.png'),
            AssetsRepository.FromAtlas('mainAtlas', 'cross.png'),
            AssetsRepository.FromAtlas('mainAtlas', 'tick.png')
        ];

        this.toolX = window.innerWidth/2 - 100;
        this.toolY = window.innerHeight/2 - 100;
        this.padding = 0;

        this.tool = undefined;

        this.backButton = new Button({
            "normal" : AssetsRepository.FromAtlas('mainAtlas', 'button_normal.png'),
            "over" : AssetsRepository.FromAtlas('mainAtlas', 'button_over.png'),
            "pressed" : AssetsRepository.FromAtlas('mainAtlas', 'button_pressed.png')
        }, "Go Back");
        this.backButton.addCallback(this.onBackButtonPressed, this);
        this.backButton.position.set(window.innerWidth/2,window.innerHeight/2 + 100);
        this.scene.addChild(this.backButton);
    }

    onBackButtonPressed(){
        this.game.transitionToState("MainMenu");
    }

    makeToolElements(){
        let length = 1 + Math.floor(Math.random() * this.maxLength);
        let elems = [];
        for(let i=0;i<length;++i){
            let choice = Math.round(Math.random());
            if(choice == 0){
                let randText = this.texts[Math.floor(Math.random() * this.texts.length)];
                let randFont = this.minFontSize + (Math.round(Math.random() * (this.maxFontSize - this.minFontSize)));
                elems.push(new PIXI.Text(randText, {
                    fontSize: randFont
                }));
            }else{
                let randTex = this.possibleTextures[Math.floor(Math.random() * this.possibleTextures.length)];
                elems.push(new PIXI.Sprite(randTex));
            }
        }
        return elems;
    }

    update(delta){
        this.changeTime += this.game.elapsedMS() * 0.001;
        if(this.changeTime >= this.timeToChange){
            this.changeTime = 0;
            this.scene.removeChild(this.tool);
            this.refreshTool();
        }
    }

    refreshTool(){
        this.tool = new TextTool(this.makeToolElements(), this.padding);
        this.tool.position.set(this.toolX, this.toolY);
        this.scene.addChild(this.tool);
    }

    onEnter(){
        this.refreshTool();
        this.changeTime = 0;
    }

    onExit(){
        this.scene.removeChild(this.tool);
    }
}