import { Button } from "@pixi/ui";
import { Graphics, Text } from "pixi.js";

export const makeNavButton = (label: string, x: number, y: number) => {
    const buttonView = new Graphics().beginFill(0xFFFFFF).drawRoundedRect(0, 0, 60, 45, 5);

    const text = new Text(label, { fontSize: 20 });
    text.anchor.set(0.5, 0.5);
    text.position.x = buttonView.width / 2 - buttonView.x;
    text.position.y = buttonView.height / 2 + buttonView.y;
    buttonView.addChild(text);
    
    buttonView.x = x;
    buttonView.y = y;
    return new Button(buttonView);
}