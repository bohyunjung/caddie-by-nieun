import { Container } from 'pixi.js'
import { IScene } from '../shared/scene-manager';
import { makeNavBar } from '../ui/nav-bar';

export class MainScene extends Container implements IScene {

    constructor() {
        super();
        this.addChild(makeNavBar());
    }

    update(_: number): void {
        //...
    }

    resize(_2: number, _1: number): void {
        //...
    }
}