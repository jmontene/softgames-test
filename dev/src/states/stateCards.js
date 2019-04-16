import GameState from "./gameState.js";
import Card from "./card.js";
import * as PIXI from "pixi.js";

let numberOfCards = 144;
let offset = 1;
let initialX = 50;
let initialY = 200;
let finalX = 700;
let finalY = 400;
let timeToGoal = 2;
let timeForNewCard = 1;

export default class StateCards extends GameState{
    constructor(){
        super();

        this.cards = [];
        this.movingCards = [];
        this.curIndex = numberOfCards-1;
        this.newCardTime = 0;

        let x = initialX;
        let y = initialY;
        let fx = finalX;
        let fy = finalY;

        for(let i = 0; i < numberOfCards; ++i){
            let card = new Card(x, y, fx, fy, timeToGoal);
            this.scene.addChild(card);
            x += offset;
            y += offset;
            fx -= offset;
            fy -= offset;

            this.cards.push(card);
        }

        this.fpsText = new PIXI.Text("FPS: ");
        this.fpsText.position.set(10,10);
        this.scene.addChild(this.fpsText);
    }

    update(delta){
        let elapsedDelta = this.game.elapsedMS() * 0.001;
        this.fpsText.text = "FPS: " + (this.game.fps().toFixed(2));

        this.newCardTime += elapsedDelta;
        if(this.curIndex >= 0 && this.newCardTime >= timeForNewCard){
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
}