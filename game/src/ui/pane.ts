import { Container, Graphics, Text } from "pixi.js";
import { SceneManager } from "../shared/scene-manager";
import { Button } from "@pixi/ui";

export const makeReadyPane = (titleString: string, descString: string, onStart: () => void) => {
    const readyPane = new Container();

    const background = new Graphics().beginFill("chartreuse").drawRect(0, 0, SceneManager.width, SceneManager.height);
    readyPane.addChild(background);

    const title = new Text(titleString, {
        fontFamily: 'Arial',
        fontSize: 48,
        fill: 0x333,
        align: 'center',
    });
    title.anchor.set(0.5, 0.5);
    title.position.x = SceneManager.width / 2;
    title.position.y = SceneManager.height / 2 - 150;
    readyPane.addChild(title);

    const desc = new Text(descString, {
        fontFamily: 'Arial',
        fontSize: 24,
        fill: 0x333,
        align: 'center',
    });
    desc.anchor.set(0.5, 0);
    desc.position.x = SceneManager.width / 2;
    desc.position.y = SceneManager.height / 2 - 50;
    readyPane.addChild(desc);

    const buttonView = new Graphics().beginFill(0xFFFFFF).drawRoundedRect(0, 0, 60, 45, 5);
    const text = new Text("시작", { fontSize: 20 });
    text.anchor.set(0.5, 0.5);
    text.position.x = buttonView.width / 2 - buttonView.x;
    text.position.y = buttonView.height / 2 + buttonView.y;
    buttonView.addChild(text);
    buttonView.position.x = SceneManager.width / 2 - 30;
    buttonView.position.y = SceneManager.height / 2 + 150;
    const button = new Button(buttonView);
    button.onPress.connect(onStart);
    readyPane.addChild(button.view);

    return readyPane;
}

export const makeDonePane = (titleString: string, onEnd?: () => void) => {
    const donePane = new Container();

    const background = new Graphics().beginFill("chartreuse").drawRect(0, 0, SceneManager.width, SceneManager.height);
    donePane.addChild(background);

    const title = new Text(titleString, {
        fontFamily: 'Arial',
        fontSize: 64,
        fill: 0x333,
        align: 'center',
    });

    title.anchor.set(0.5, 0.5);
    title.anchor.set(0.5, 0.5);
    title.position.x = SceneManager.width / 2;
    title.position.y = SceneManager.height / 2;
    donePane.addChild(title);

    const buttonView = new Graphics().beginFill(0xFFFFFF).drawRoundedRect(0, 0, 60, 45, 5);
    const text = new Text("다음", { fontSize: 20 });
    text.anchor.set(0.5, 0.5);
    text.position.x = buttonView.width / 2 - buttonView.x;
    text.position.y = buttonView.height / 2 + buttonView.y;
    buttonView.addChild(text);
    buttonView.position.x = SceneManager.width / 2 - 30;
    buttonView.position.y = SceneManager.height / 2 + 150;
    const button = new Button(buttonView);
    if (onEnd) {
        button.onPress.connect(onEnd);
    }
    donePane.addChild(button.view);

    return donePane;
}