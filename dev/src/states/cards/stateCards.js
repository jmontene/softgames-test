import GameState from "GameStates/gameState.js";
import Button from "Utils/button.js";
import Card from "./card.js";
import * as PIXI from "pixi.js";
import * as AssetsRepository from "Utils/assetsRepository.js";

export default class StateCards extends GameState{
    constructor(game){
        super(game);

        this.name = "StateCards";

        this.timeToGoal = 2;
        this.timeForNewCard = 1;
        this.offset = 1;
        this.numberOfCards = 144;

        this.initialX = window.innerWidth/2 - 300;
        this.initialY = window.innerHeight/2 - 400;
        this.finalX = window.innerWidth/2 + 300;
        this.finalY = window.innerHeight/2 - 250;

        this.cards = [];
        this.movingCards = [];
        this.curIndex = this.numberOfCards-1;
        this.newCardTime = 0;

        let x = this.initialX;
        let y = this.initialY;
        let fx = this.finalX;
        let fy = this.finalY;

        this.cardContainer = new PIXI.particles.ParticleContainer();
        this.scene.addChild(this.cardContainer);

        for(let i = 0; i < this.numberOfCards; ++i){
            let card = new Card(x, y, fx, fy, this.timeToGoal);
            this.cardContainer.addChild(card);
            x += this.offset;
            y += this.offset;
            fx -= this.offset;
            fy -= this.offset;

            this.cards.push(card);
        }

        this.fpsText = new PIXI.Text("FPS: ");
        this.fpsText.position.set(10,10);
        this.scene.addChild(this.fpsText);

        this.backButton = new Button({
            "normal" : AssetsRepository.FromAtlas('mainAtlas', 'button_normal.png'),
            "over" : AssetsRepository.FromAtlas('mainAtlas', 'button_over.png'),
            "pressed" : AssetsRepository.FromAtlas('mainAtlas', 'button_pressed.png')
        }, "Go Back");
        this.backButton.addCallback(this.onBackButtonPressed, this);
        this.backButton.position.set(window.innerWidth/2,window.innerHeight/2 + 300);
        this.scene.addChild(this.backButton);
    }

    onBackButtonPressed(){
        this.game.transitionToState('MainMenu');
    }

    update(delta){
        let elapsedDelta = this.game.elapsedMS() * 0.001;
        this.fpsText.text = "FPS: " + (this.game.fps().toFixed(2));

        this.newCardTime += elapsedDelta;
        if(this.curIndex >= 0 && this.newCardTime >= this.timeForNewCard){
            this.newCardTime = 0;
            this.movingCards.push(this.cards[this.curIndex--]);
        }

        for(let card of this.movingCards){
            card.move(elapsedDelta);
        }
        if(this.movingCards.length > 0 && 
            this.movingCards[this.movingCards.length-1].finished){
            this.movingCards.pop();
        }
    }

    onEnter(){
        while(this.movingCards.length > 0){
            this.movingCards.pop();
        }
        this.newCardTime = 0;
        this.curIndex = this.numberOfCards-1;
        for(let card of this.cards){
            card.reset();
        }
    }
}