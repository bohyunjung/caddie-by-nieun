import { Container, Sprite } from 'pixi.js';
import { IScene } from '../../shared/scene-manager';

export class Game3Scene extends Container implements IScene {
    private _fishList: Sprite[];

    constructor(parentWidth: number, parentHeight: number) {
        super();

        this._fishList = [...Array(5).keys()].map(n => Sprite.from("3/fish/" + n));
        this._fishList.forEach((fish, i) => {
            fish.anchor.set(0.5);
            fish.width = 96;
            fish.height = 32;
            fish.position.x = parentWidth / 2 + (i - 2) * 128;
            fish.position.y = parentHeight / 2;
            this.addChild(fish);
        });
    }

    update(_: number): void {

    }
}