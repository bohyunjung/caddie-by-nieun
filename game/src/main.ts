import './style.css';
import { SceneManager } from './shared/scene-manager';
import { FILL_COLOR } from './shared/constants';
import { Game1Scene } from './scenes/game/game1';
import { Game2Scene } from './scenes/game/game2';
import { Game3Scene } from './scenes/game/game3';
import { Game4Scene } from './scenes/game/game4';
import { Game5Scene } from './scenes/game/game5';
import { loadAsset } from './shared/loader';


const GAME_SCENES = new Map<string, any>([
    ["1", Game1Scene],
    ["2", Game2Scene],
    ["3", Game3Scene],
    ["4", Game4Scene],
    ["5", Game5Scene]
]);

let gameScene = GAME_SCENES.get(window.location.hash.slice(1));

if (gameScene) {
    loadAsset().then(() => {
        SceneManager.init(FILL_COLOR);
        SceneManager.changeScene(new gameScene());
    });
} else {
    alert("비정상적인 접근입니다.");
}