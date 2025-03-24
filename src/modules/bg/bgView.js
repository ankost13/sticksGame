import {View} from "../../utils/view";
import {Assets, Sprite, TextStyle, Text} from "pixi.js";

export class BgView extends View {
    constructor(parent, resizeData) {
        super(parent, resizeData);
        this.addBg();
        this.position.set(this.size.width / 2, this.size.height / 2);
        //this.createRulesText();
    }

    addBg() {
        this.bg = new Sprite({
            texture: Assets.get("bg"),
            anchor: 0.5,
            scale: .8,
        })
        this.addChild(this.bg);
    }

    createRulesText() {
        const style = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 36,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: "#123",
            stroke: { color: '#ffffff', width: 5, join: 'round' },
            wordWrap: true,
            wordWrapWidth: 440,
        });

        this.massageText = new Text({
            text: 'The one who removes the last match loses.',
            style: style,
        });
        this.bg.addChild(this.massageText);
        this.massageText.position.set(0, 0);
    }


}