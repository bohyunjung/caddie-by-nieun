import { Container } from "pixi.js";
import { makeNavButton } from "./nav-button";
import { MainScene } from "../scenes/main";
import { SceneManager } from "../shared/scene-manager";
import { Game3Scene } from "../scenes/game/game3";

export const makeNavBar = () => {
    const navBar = new Container();
    navBar.height = 100;
    navBar.width = 0;
    const navMap = [
        { text: "🏠", scene: MainScene },
        { text: "🚧", scene: MainScene },
        { text: "🚧", scene: MainScene },
        { text: "🐟", scene: Game3Scene },
    ]
    navMap.forEach((e, i) => {
        const navButton = makeNavButton(e.text, 10 + 70 * i, 10);
        navButton.onPress.connect(() => {
            SceneManager.changeScene(new e.scene());
        });
        navBar.addChild(navButton.view);
    });
    return navBar;
}