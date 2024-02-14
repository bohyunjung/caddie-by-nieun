import { Button } from "@pixi/ui";
import { Container, Graphics, Text } from "pixi.js";
import { MainScene } from "../scenes/main";
import { Game3Scene } from "../scenes/game/game3";
import { SceneManager } from "../shared/scene-manager";
import { Game2Scene } from "../scenes/game/game2";
import { Game4Scene } from "../scenes/game/game4";
import { Game1Scene } from "../scenes/game/game1";
import { Game5Scene } from "../scenes/game/game5";

export const makeNavButton = (labelString: string, x: number, y: number) => {
    const buttonView = new Graphics().beginFill(0xFFFFFF).drawRoundedRect(0, 0, 60, 45, 5);

    const text = new Text(labelString, { fontSize: 20 });
    text.anchor.set(0.5, 0.5);
    text.position.x = buttonView.width / 2 - buttonView.x;
    text.position.y = buttonView.height / 2 + buttonView.y;
    buttonView.addChild(text);

    buttonView.x = x;
    buttonView.y = y;
    return new Button(buttonView);
}

export const makeNavBar = () => {
    const navBar = new Container();
    navBar.height = 100;
    navBar.width = 0;
    const navMap = [
        { text: "🏠", scene: MainScene },
        { text: "🚧", scene: Game1Scene },
        { text: "🪴", scene: Game2Scene },
        { text: "🐟", scene: Game3Scene },
        { text: "🚔", scene: Game4Scene },
        { text: "🚧", scene: Game5Scene },
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