import * as PIXI from 'pixi.js';

export default class TextTool extends PIXI.Container{
    constructor(elements, padding){
        super();

        let x = 0;
        for(let elem of elements){
            elem.anchor.set(0, 0.5);
            elem.position.x = x;
            elem.position.y = 0;
            this.addChild(elem);

            x += elem.width + padding;
        }
    }
}