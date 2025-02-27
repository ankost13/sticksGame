import {View} from "../../utils/view";
import {Assets, Container, Sprite} from "pixi.js";

export class ButtonView extends View {
    static BUTTON_CLICK = "ButtonView.BUTTON_CLICK"

    constructor(parent, resizeData) {
        super(parent, resizeData);
        this.collectionButton = [];
        this.addButtons();
    }

    addButtons() {
        this.buttonsParent = new Container();
        this.addChild(this.buttonsParent);
        this.startPositionX = this.size.width / 2 - 400;
        this.startPositionY = this.size.height / 2 + 230;

        for (let i = 1; i <= 3; i++) {
            const button = new Sprite();
            button.texture = Assets.get("button" + i);
            button.anchor = .5;
            button.scale = .3;
            button.x = this.startPositionX + 200 * i;
            button.y = this.startPositionY;
            button.interactive = true;
            button.cursor = "pointer";
            this.buttonsParent.addChild(button);
            this.collectionButton.push(button);
        }
        this.setButtonsLogic();
    }

    setButtonsLogic() {
        this.collectionButton.forEach((square, index) => {
            square.on("pointerup", () => {
                this.notifyToMediator(ButtonView.BUTTON_CLICK, index);
            });
        });
    }

}