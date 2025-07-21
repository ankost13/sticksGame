import {View} from "../../utils/view";
import gsap from 'gsap';
import {Assets, Container, Sprite,  BitmapText} from "pixi.js";
import {setAnimationTimeoutSync} from "../../utils/helperFunction";
import {WinNotification} from "./winNotification";

export class WinView extends View {
    constructor(parent, resizeData) {
        super(parent, resizeData);
        this.createPopupContainer()
    }

    createPopupContainer() {
        this.popupContainer = new Container();
        this.addChild(this.popupContainer)
        this.createPopup()
        this.createText("")
    }

    createPopup() {
        this.popup = new Sprite({
            texture: Assets.get("popup"),
            anchor: .5,
            x: -600,
            y: -500,
            scale: .9,
            visible: false,
        });
        this.popupContainer.addChild(this.popup)
    }

    showTransition(text) {
        this.animationPopupIn()
        this.massageText.text = text
    }

    animationPopupIn() {
        this.popup.position.set(-600, -500)
        this.popup.alpha = 0
        this.popup.rotation = 0
        this.popup.visible = true

        gsap.to(this.popup, {
            duration: 1.2,
            x: this.size.width / 2,
            y: this.size.height / 2,
            rotation: 2 * Math.PI,
            alpha: 1,
            ease: "power4.out",
            onComplete: () => {
                this.createButtonNext()
            }
        });
    }

    animationPopupOut() {
        const targetX = this.size.width
        const targetY = -500

        gsap.to(this.popup, {
            duration: 1.2,
            x: targetX,
            y: targetY,
            rotation: this.popup.rotation + 2 * Math.PI,
            alpha: 0,
            ease: "power4.in",
            onComplete: () => {
                this.popup.visible = false;
                this.buttonNext.visible = false;
            }
        });
    }


    createText(text) {
        this.massageText = new BitmapText({
            text: "",
            style: {
                fontFamily: 'Desyrel',
                fontSize: 100,
                align: 'left',
                fill: "#fff"
            },
            anchor: 0.5,
            x: 0,
            y: 0,
        });
        this.popup.addChild(this.massageText);

        this.massageText.text = text
    }

    createButtonNext() {
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
            this.animationPopupOut()
            this.massageText.text = ""
            this.notifyToMediator(WinNotification.RESET_GAME)
        });
    }
}
