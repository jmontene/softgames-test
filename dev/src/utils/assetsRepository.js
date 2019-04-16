import * as PIXI from "pixi.js";

let Loader = PIXI.loader;
let Resources = Loader.resources;
let AssetPath = "../assets/";
let Atlases = new Map();

function AddAtlas(key, filename){
    Atlases.set(key,Resources[AssetPath + filename].textures);
}

export function LoadAssets(specs, callback){
    for(let spec of specs){
        switch(spec.type){
            case "atlas":
                Loader.add(AssetPath + spec.filename, () => AddAtlas(spec.atlasKey, spec.filename));
                break;
        }
    }
    Loader.load(callback);
}

export function FromAtlas(atlasKey, objKey){
    return Atlases.get(atlasKey)[objKey];
}