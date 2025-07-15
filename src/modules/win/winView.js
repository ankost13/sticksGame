import {View} from "../../utils/view";
import {Assets, Container, Sprite,  BitmapText} from "pixi.js";

export class WinView extends View {
    constructor(parent, resizeData) {
        super(parent, resizeData);
        // this.createPopupContainer("textMessege")
    }

    createPopupContainer(text) {
        this.text = text
        this.popupContainer = new Container();
        this.addChild(this.popupContainer)
        this.createPopup()
        this.createButtonNext()
        this.createText()
    }

    createPopup() {
        this.popup = new Sprite({
            texture: Assets.get("popup"),
            anchor: .5,
            x: this.size.width / 2,
            y: this.size.height / 2,
            scale: .9,
        });
        this.popupContainer.addChild(this.popup)
    }

    createText() {
        this.massageText = new BitmapText({
            text: "",
            style: {
                fontFamily: 'Desyrel',
                fontSize: 100,
                align: 'left',
                fill: "#fff"
            },
            anchor: 0.5,
            x: this.size.width / 2,
            y: this.size.height / 2,
        });
        this.popupContainer.addChild(this.massageText);

        this.massageText.text = this.text
    }

    createButtonNext () {
        this.buttonNext = new Sprite({
            texture: Assets.get("next"),
            anchor: .5,
            x: this.size.width - 150,
            y: this.size.height / 2,
            scale: 2,
            interactive: true,
        });
        this.popupContainer.addChild(this.buttonNext)
        this.setButtonsLogic()
    }

    setButtonsLogic() {
        this.buttonNext.cursor = "pointer";
        this.buttonNext.on("pointerup", () => {
            console.error("pointerup");
        });
    }
}
