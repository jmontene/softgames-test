import GameState from "GameStates/gameState.js";
import Button from "Utils/button.js";
import * as PIXI from "pixi.js";
import * as AssetsRepository from "Utils/assetsRepository.js";

export default class StateFire extends GameState{
    constructor(game){
        super(game);
        this.name = "StateFire";

        this.particleContainer = new PIXI.particles.ParticleContainer();
        this.fireEmitter = this.game.dust.emitter(
            80,
            () => this.game.dust.create(
                0,
                0,
                () => new PIXI.Sprite(
                    AssetsRepository.FromAtlas('mainAtlas', 'fire.png')
                ),
                this.particleContainer,
                1,
                0,
                true,
                4.5, 5,        //Angle
                16,24,         //Size
                0.5, 0.7,      //Speed
                0.005,0.01,    //Speed Scaling
                0.02,0.06      //Alpha Speed
            )
        );
        this.fireEmitter.stop();

        this.particleContainer.position.set(window.innerWidth/2, window.innerHeight/2);
        this.particleContainer.scale.set(3,3);
        this.scene.addChild(this.particleContainer);

        this.particleText = new PIXI.Text("Particles on screen: ");
        this.particleText.position.set(10,10);
        this.scene.addChild(this.particleText);

        this.backButton = new Button({
            "normal" : AssetsRepository.FromAtlas('mainAtlas', 'button_normal.png'),
            "over" : AssetsRepository.FromAtlas('mainAtlas', 'button_over.png'),
            "pressed" : AssetsRepository.FromAtlas('mainAtlas', 'button_pressed.png')
        }, "Go Back");
        this.backButton.addCallback(this.onBackButtonPressed, this);
        this.backButton.position.set(window.innerWidth/2,window.innerHeight/2 + 100);
        this.scene.addChild(this.backButton);
    }

    update(){
        this.particleText.text = "Particles on screen: " + this.particleContainer.children.length;
    }

    onEnter(){
        this.fireEmitter.play(); 
    }

    onExit(){
        this.fireEmitter.stop();
    }

    onBackButtonPressed(){
        this.game.transitionToState("MainMenu");
    }
}