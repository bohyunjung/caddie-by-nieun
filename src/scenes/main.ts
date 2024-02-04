import { Container, Text } from 'pixi.js'
import { IScene, SceneManager } from '../shared/scene-manager';
import { makeNavBar } from '../ui/nav-bar';
import { ZoomBlurFilter } from 'pixi-filters';

export class MainScene extends Container implements IScene {

    private _titleText: Text;
    private _direction: number = 1;
    private _timer: number = 0;
    private offset: number = -50;

    constructor() {
        super();
        this._titleText = new Text("캐디캐디 해저드\n거북이와 두루미\n삼천갑자 동방삭\n치치카포 사리사리센타\n워리워리 세브리깡", {
            fontFamily: 'Arial',
            fontSize: 80,
            fill: 0x0e0e0e,
            align: 'center',
            padding: 100
        });
        this._titleText.anchor.set(0.5, 0.5);
        this._titleText.position.x = SceneManager.width / 2;
        this._titleText.position.y = SceneManager.height / 2;
        this._titleText.filters = [new ZoomBlurFilter({ center: [250, 75], strength: 0.1 })];
        this.addChild(this._titleText);

        this.addChild(makeNavBar());
    }

    update(_: number): void {
        this._timer += 1;
        if (this._timer % 5 == 0) {
            this._direction *= -1;
        }
        this.offset += this._direction * 4;

        this._titleText.filters = [new ZoomBlurFilter({
            center: [250 + this.offset, 75 + this.offset],
            strength: 0.08
        })];
    }

    resize(_2: number, _1: number): void {
        //...
    }
}