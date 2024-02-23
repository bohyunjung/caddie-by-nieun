import { Container, Sprite, Text } from 'pixi.js';
import { SceneManager, IScene } from '../../shared/scene-manager';
import { makeNavBar } from '../../ui/nav';
import { GameState } from '../../shared/enums';
import { makeDonePane, makeReadyPane } from '../../ui/pane';
import { MainScene } from '../main';

const TARGET_COUNT: number = 99;
const UI_MARGIN: number = 60;

export class Game3Scene extends Container implements IScene {

    private _gameState: GameState;
    private _readyPane: Container;
    private _donePane: Container;

    private _mouth: Sprite;
    private _mouthActive: boolean;

    private _fishList: Sprite[];
    private _score: number = 0;
    private _scoreText: Text;

    initMouth() {
        this._mouth = Sprite.from("3/mouth");
        this._mouth.eventMode = 'static';
        this._mouth.anchor.set(0.5);
        this._mouth.width = 64;
        this._mouth.height = 64;
        this._mouth.onglobalmousemove = (mouse) => {
            this._mouth.position.x = mouse.globalX;
            this._mouth.position.y = mouse.globalY;
        }
        this.addChild(this._mouth);

        this.on('mousedown', () => {
            this._mouthActive = true;
        });
        this.on('mouseup', () => {
            this._mouthActive = false;
        });
    }

    initFishList() {
        this._fishList = [...Array(TARGET_COUNT).keys()].map(n => Sprite.from("3/fish/" + n % 5));
        this._fishList.forEach((fish) => {
            fish.eventMode = 'static';
            fish.anchor.set(0.5);
            fish.width = 96;
            fish.height = 32;
            fish.position.x = Math.random() * this._width;
            fish.position.y = Math.random() * (this._height - UI_MARGIN) + UI_MARGIN;

            fish.onmouseenter = () => {
                if (this._mouthActive) {
                    this._score += 1;
                    this.removeChild(fish);
                }
            };
            this.addChild(fish);
        });
    }

    initScoreText() {
        this._scoreText = new Text(this._score, {
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 0xff1010,
            align: 'center',
        });
        this._scoreText.anchor.set(0.5, 0.5);
        this._scoreText.position.x = this._width / 2;
        this._scoreText.position.y = this._height / 2;
        this.addChild(this._scoreText);
    }

    constructor() {
        super();
        this.eventMode = 'static';
        this._gameState = GameState.READY;

        this._width = SceneManager.width;
        this._height = SceneManager.height;

        this.initMouth();
        this.initScoreText();
        this.initFishList();

        // this.addChild(makeNavBar());

        this._readyPane = makeReadyPane(
            "배테랑 캐디가 만든 이상한 게임 3",
            "지금 앞팀은 이미 세컨 지나갔다니까\n언제까지 그늘집에 앉아있을거야??\n\n빨리빨리 좀 먹고 이동하자고!",
            () => {
                this._gameState = GameState.ACTIVE
            }
        )
        this.addChild(this._readyPane);

        this._donePane = makeDonePane(
            "다 먹었으면 가자",
            () => {
                window.parent.next();
            }
        )
        this.addChild(this._donePane);
    }

    update(_: number): void {
        this._readyPane.visible = this._gameState == GameState.READY;
        this._donePane.visible = this._gameState == GameState.DONE;

        if (this._score == TARGET_COUNT) {
            this._gameState = GameState.DONE;
        } else {
            this._scoreText.text = `${TARGET_COUNT - this._score}개만 더 먹고 일어나`;
            this._scoreText.style.fontSize = 24 + 12 * (this._score / TARGET_COUNT);
        }
    }
}