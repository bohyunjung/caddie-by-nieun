import { Container } from 'pixi.js';
import { SceneManager, IScene } from '../../shared/scene-manager';
import { makeNavBar } from '../../ui/nav';
import { GameState } from '../../shared/enums';
import { makeDonePane, makeReadyPane } from '../../ui/pane';
import { MainScene } from '../main';

const UI_MARGIN: number = 60;

export class Game1Scene extends Container implements IScene {

    private _gameState: GameState;
    private _readyPane: Container;
    private _donePane: Container;

    constructor() {
        super();
        this.eventMode = 'static';
        this._gameState = GameState.READY;

        this._width = SceneManager.width;
        this._height = SceneManager.height;

        // this.addChild(makeNavBar());

        this._readyPane = makeReadyPane(
            "배테랑 캐디가 만든 이상한 게임 1",
            "그렇게 도로가 좋으면\n차라리 코스를 전부 잔디 말고\n도로로 만들어 버리는 게 낫겠어!",
            () => {
                this._gameState = GameState.DONE;
            }
        )
        this.addChild(this._readyPane);

        this._donePane = makeDonePane(
            "공사중...",
            () => {
                window.parent.next();
            }
        )
        this.addChild(this._donePane);
    }

    update(_: number): void {
        this._readyPane.visible = this._gameState == GameState.READY;
        this._donePane.visible = this._gameState == GameState.DONE;
    }
}