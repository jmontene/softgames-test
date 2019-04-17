import Style from "Styles/style.css";
import Game from './game.js';
import * as PIXI from 'pixi.js';
import * as GameStates from 'GameStates/gameStates.js';
import * as AssetsRepository from "Utils/assetsRepository.js"

let app = new PIXI.Application({
    width: 256,
    height: 256,
    antialias: true,
    transparent: false,
    resolution: 1
});

function resize(){
    app.renderer.resize(window.innerWidth, window.innerHeight);
}

function startApp(){
    app.renderer.view.classList.add("app");
    app.renderer.backgroundColor = 0xf9e7c2;
    app.renderer.autoResize = true;
    resize();
    document.body.appendChild(app.view);

    window.addEventListener('resize', resize, false);

    let game = new Game(app);
    let states = [
        new GameStates.MainMenu(game),
        new GameStates.StateCards(game),
        new GameStates.StateTextTool(game),
        new GameStates.StateFire(game)
    ]
    game.start(states, "MainMenu");
}

AssetsRepository.LoadAssets([
    {type: 'atlas', filename: 'img/mainAtlas.json', atlasKey: 'mainAtlas'}
], startApp);