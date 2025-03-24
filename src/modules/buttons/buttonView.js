import {View} from "../../utils/view";
import {Assets, Container, Sprite} from "pixi.js";

export class ButtonView extends View {
    static BUTTON_CLICK = "ButtonView.BUTTON_CLICK"

    constructor(parent, resizeData) {
        super(parent, resizeData);
        this.collectionButtons = [];
        this.createButtons();
        this.setButtonsLogic();
    }

    createButtons() {
        this.buttonsParent = new Container();
        this.addChild(this.buttonsParent);
        this.startPositionX = this.size.width / 2 - 400;
        this.startPositionY = this.size.height / 2 + 230;

        for (let i = 1; i <= 3; i++) {
            const button = new Sprite();
            button.texture = Assets.get("button" + i);
            button.anchor.set(.5);
            button.scale = .3;
            button.x = this.startPositionX + 200 * i;
            button.y = this.startPositionY;
            button.cursor = "pointer";
            this.buttonsParent.addChild(button);
            this.collectionButtons.push(button);
        }
        this.setInteractiveOnMatches(true, 1);
        this.setInteractiveOnMatches(true, 2);
        this.setInteractiveOnMatches(true, 3);
    }

    setButtonsLogic() {
        this.collectionButtons.forEach((button, index) => {
            button.on("pointerup", () => {
                this.notifyToMediator(ButtonView.BUTTON_CLICK, index + 1);
                this.setInteractiveOnMatches(false, 1);
                this.setInteractiveOnMatches(false, 2);
                this.setInteractiveOnMatches(false, 3);
            });
        });
    }

    setInteractiveOnMatches(trueOrFalse, numberButton) {

            this.collectionButtons[numberButton-1].interactive = trueOrFalse;
            if (trueOrFalse === true) {
                this.collectionButtons[numberButton-1].texture = Assets.get("button" + numberButton);
            } else {
                this.collectionButtons[numberButton-1].texture = Assets.get("buttonDark" + numberButton);
            }
    }


}