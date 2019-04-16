import * as PIXI from 'pixi.js';
import * as AssetsRepository from "Utils/assetsRepository.js";

export default class Card extends PIXI.Sprite{
    constructor(initX, initY, targetX, targetY, timeToGoal){
        super(AssetsRepository.FromAtlas('mainAtlas', 'card.png'));
        this.initX = initX;
        this.initY = initY;
        this.targetX = targetX;
        this.targetY = targetY;
        this.position.set(initX, initY);
        this.moveTime = 0;
        this.timeToGoal = timeToGoal;
        this.finished = false;
        this.switched = false;
    }

    move(deltaTime){
        this.moveTime += deltaTime;
        let t = this.moveTime / this.timeToGoal;

        if(t >= 0.5 && !this.switched){
            let parent = this.parent;
            parent.removeChild(this);
            parent.addChild(this);
            this.switched = true;
        }
        if(t >= 1){
            t = 1;
        }

        this.position.x = this.initX + (this.targetX - this.initX) * t;
        this.position.y = this.initY + (this.targetY - this.initY) * t;

        if(t == 1){
            this.finished = true;
        }
    }
}