import { Container, Rectangle, Sprite, Text, Texture } from 'pixi.js';
import { SceneManager, IScene } from '../../shared/scene-manager';
import { makeNavBar } from '../../ui/nav';
import { GameState } from '../../shared/enums';
import { makeDonePane, makeReadyPane } from '../../ui/pane';
import { MainScene } from '../main';

const TARGET_COUNT: number = 50;
const UI_MARGIN: number = 60;

export class Game2Scene extends Container implements IScene {

    private _gameState: GameState;
    private _readyPane: Container;
    private _donePane: Container;

    private _shovel: Sprite;

    private _divotList: Sprite[];
    private _score: number = 0;
    private _scoreText: Text;

    initShovel() {
        this._shovel = Sprite.from("2/shovel/1");
        this._shovel.eventMode = 'static';
        this._shovel.anchor.set(0, 0.9);
        this._shovel.width = 50;
        this._shovel.height = 25;
        this._shovel.onglobalmousemove = (mouse) => {
            this._shovel.position.x = mouse.globalX;
            this._shovel.position.y = mouse.globalY;
        }
        this.addChild(this._shovel);

        this.on('mousedown', () => {
            this._shovel.texture = Texture.from("2/shovel/0");
        });
        this.on('mouseup', () => {
            this._shovel.texture = Texture.from("2/shovel/1");
        });

    }

    initDivotList() {
        this._divotList = [...Array(TARGET_COUNT).keys()].map(n => Sprite.from("2/divot/" + n % 2));
        this._divotList.forEach((divot) => {
            divot.eventMode = 'static';
            divot.anchor.set(0.5);
            divot.width = 24;
            divot.height = 12;
            divot.position.x = Math.random() * this._width;
            divot.position.y = Math.random() * (this._height - UI_MARGIN) + UI_MARGIN;

            this.on('mousedown', (e) => {
                let r = new Rectangle(e.globalX, e.globalY, 1, 1);
                if (r.intersects(divot.getBounds()) && divot.isInteractive()) {
                    this._score += 1;
                    this.removeChild(divot);
                    divot.eventMode = 'none';
                }
            });

            this.addChild(divot);
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

        const bg = Sprite.from("2/bg");
        bg.width = SceneManager.width;
        bg.height = SceneManager.height;
        this.addChild(bg);

        // this.initScoreText();
        this.initDivotList();
        this.initShovel();


        this.addChild(makeNavBar());

        this._readyPane = makeReadyPane(
            "배토배토",
            "그동안 골프장 코스 관리를 위해 나 너무 고생한 것 같다..\n그놈의 배토배토 누가 나 대신 배토 좀 해줘!\n\n나도 퇴근 좀 하게!!",
            () => {
                this._gameState = GameState.ACTIVE
            }
        )
        this.addChild(this._readyPane);

        this._donePane = makeDonePane(
            "다 메웠으면 가자",
            () => {
                SceneManager.changeScene(new MainScene());
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
            // this._scoreText.text = `${TARGET_COUNT - this._score}개의 멸치가 남았어`;
            // this._scoreText.style.fontSize = 24 + 12 * (this._score / TARGET_COUNT);
        }
    }
}