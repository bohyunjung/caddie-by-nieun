import { Container, Sprite, Texture } from 'pixi.js';
import { SceneManager, IScene } from '../../shared/scene-manager';
import { makeNavBar } from '../../ui/nav';
import { GameState } from '../../shared/enums';
import { makeDonePane, makeReadyPane } from '../../ui/pane';
import { MainScene } from '../main';
import { AFFINE, LinearProjection, ProjectionSurface, Sprite2d, Sprite3d } from 'pixi-projection';

const UI_MARGIN: number = 60;

export class Game4Scene extends Container implements IScene {

    private _gameState: GameState;
    private _readyPane: Container;
    private _donePane: Container;

    constructor() {
        super();
        this.eventMode = 'static';
        this._gameState = GameState.ACTIVE;

        this._width = SceneManager.width;
        this._height = SceneManager.height;

        const cart = new Sprite3d(Texture.from("4/cart"));
        cart.proj.affine = AFFINE.AXIS_X;

        cart.position3d.z = 100;


        this.addChild(cart);

        this.addChild(makeNavBar());

        this._readyPane = makeReadyPane(
            "천천히 빨리",
            "지금 골프가 문제가 아니라 앞팀을 쫓아가야 해.\n그만 치고 전부 카트에 타!\n지금 경기과는 관제시스템으로 우리가 어디에 있는지 지켜보고 있다니까!!",
            () => {
                this._gameState = GameState.ACTIVE;
            }
        )
        this.addChild(this._readyPane);

        this._donePane = makeDonePane(
            "공사중",
            () => {
                SceneManager.changeScene(new MainScene());
            }
        )
        this.addChild(this._donePane);
    }

    update(_: number): void {
        this._readyPane.visible = this._gameState == GameState.READY;
        this._donePane.visible = this._gameState == GameState.DONE;
    }
}