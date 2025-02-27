import {View} from "../../utils/view";
import {randomInteger} from "../../utils/helperFunction";
import {Assets, Container, Sprite} from "pixi.js";

export class FieldView extends View {
    constructor(parent, resizeData) {
        super(parent, resizeData);
        this.collectionMatches = [];
        this.addMatches();
    }

    addMatches() {
        this.parentForMatches = new Container();
        this.addChild(this.parentForMatches);
        this.numberMatches = randomInteger(10,20);
        console.error(this.numberMatches); // TODO
        console.error(this.size); // TODO
        this.startPositionX = this.size.width / 2 - 24 * this.numberMatches;
        this.startPositionY = this.size.height / 2 - 70;

        for (let i = 0; i < this.numberMatches; i++) {
            const match = new Sprite();
            match.texture = Assets.get("match");
            match.anchor = .5;
            match.x = this.startPositionX + 50 * i;
            match.y = this.startPositionY;
            this.parentForMatches.addChild(match);
            this.collectionMatches.push(match);
        }
    }

}