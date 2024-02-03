import { Container, IDestroyOptions, Sprite, Text } from 'pixi.js';
import { SceneManager, IScene } from '../../shared/scene-manager';

const TARGET_COUNT: number = 10;

export class Game3Scene extends Container implements IScene {

    private _mouth: Sprite;
    private _mouthActive: boolean;

    private _fishList: Sprite[];
    private _score: number = 0;
    private _scoreText: Text;

    initMouth() {
        this._mouth = Sprite.from("3/mouth");
        this._mouth.anchor.set(0.5);
        this._mouth.width = 64;
        this._mouth.height = 64;
        this._mouth.eventMode = 'static';
        this._mouth.onglobalmousemove = (mouse) => {
            this._mouth.position.x = mouse.globalX;
            this._mouth.position.y = mouse.globalY;
        }
        this.addChild(this._mouth);
        SceneManager.on('mousedown', () => {
            this._mouthActive = true;
        });
        SceneManager.on('mouseup', () => {
            this._mouthActive = false;
        });
    }

    initFishList(parentWidth: number, parentHeight: number) {
        this._fishList = [...Array(TARGET_COUNT).keys()].map(n => Sprite.from("3/fish/" + n % 5));
        this._fishList.forEach((fish) => {
            fish.anchor.set(0.5);
            fish.width = 96;
            fish.height = 32;
            fish.position.x = Math.random() * parentWidth;
            fish.position.y = Math.random() * parentHeight;

            fish.eventMode = 'static';
            fish.cursor = 'pointer';
            fish.onmouseenter = () => {
                if (this._mouthActive) {
                    this._score += 1;
                    this.removeChild(fish);
                }
            };
            this.addChild(fish);
        });
    }

    initScoreText(parentWidth: number, parentHeight: number) {
        this._scoreText = new Text(this._score, {
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 0xff1010,
            align: 'center',
        });
        this._scoreText.position.x = parentWidth / 2;
        this._scoreText.position.y = parentHeight / 2;
        this._scoreText.anchor.set(0.5, 0.5);
        this.addChild(this._scoreText);
    }

    constructor(parentWidth: number, parentHeight: number) {
        super();

        this.initMouth();
        this.initFishList(parentWidth, parentHeight);
        this.initScoreText(parentWidth, parentHeight);

    }

    update(_: number): void {
        if (this._score == TARGET_COUNT) {
            this._scoreText.text = "다 먹었으면 가자";
        } else {
            this._scoreText.text = `${TARGET_COUNT - this._score}개의 멸치가 남았어`;
        }
    }

    destroyMouth() {
        SceneManager.off('mousedown');
        SceneManager.off('mouseup');
    }

    destroy(options?: boolean | IDestroyOptions | undefined): void {
        this.destroyMouth();
    }
}