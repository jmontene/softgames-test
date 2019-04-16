import * as PIXI from "pixi.js";

export default class Button extends PIXI.Sprite{
    constructor(buttonTextures, buttonText){
        super(buttonTextures.normal);
        this.buttonMode = true;
        this.anchor.set(0.5,0.5);
        this.interactive = true;
        this.buttonTextures = buttonTextures;
        this.pressed = false;
        this.over = false;

        this.callback = undefined;
        this.callbackContext = undefined;
        this.buttonText = new PIXI.Text(buttonText, {
            fontFamily : 'Arial', 
            fontSize: 24, 
            fill : 0xffffff, 
            align : 'center'
        });
        this.buttonText.anchor.set(0.5,0.5);
        this.addChild(this.buttonText);
        this.buttonText.position.set(0,0);

        this
            .on('pointerdown', this.onButtonDown)
            .on('pointerup', this.onButtonUp)
            .on('pointerupoutside', this.onButtonUp)
            .on('pointerover', this.onButtonOver)
            .on('pointerout', this.onButtonOut)
    }

    addCallback(callback, contextObj){
        this.callback = callback;
        this.callbackContext = contextObj;
    }

    onButtonDown(){
        let bTex = this.buttonTextures;

        this.pressed = true;
        this.texture = (bTex.pressed ? bTex.pressed : bTex.normal);
        this.alpha = 1;

        this.callback.call(this.callbackContext);
    }

    onButtonUp(){
        this.pressed = false;
        let bTex = this.buttonTextures;

        if(this.over){
            this.texture = (bTex.over ? bTex.over : bTex.normal);
        }else{
            this.texture = bTex.normal;
        }
    }

    onButtonOver(){
        this.over = true;
        if(this.pressed) return;
        this.texture = this.buttonTextures.over;
    }

    onButtonOut(){
        this.over = false;
        if(this.pressed) return;
        this.texture = this.buttonTextures.normal;
    }
}