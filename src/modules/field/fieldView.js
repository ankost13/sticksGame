import {View} from "../../utils/view";
import {randomInteger} from "../../utils/helperFunction";
import {Assets, Container, Sprite} from "pixi.js";

export class FieldView extends View {
    constructor(parent) {
        super(parent);
        this.collectionMatches = [];
        this.collectionButton = [];
        this.addMatches();
        this.addButton();
    }

    addMatches() {
        this.parentForMatches = new Container();
        this.addChild(this.parentForMatches);
        this.numberMatches = randomInteger(10,20);
        console.error(this.numberMatches);
        this.startPositionX = window.innerWidth / 2 - 24 * this.numberMatches;
        this.startPositionY = window.innerHeight / 2 - 70;

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

    addButton() {
        this.startPositionX = window.innerWidth / 2 - 400;
        this.startPositionY = window.innerHeight / 2 + 230;

        for (let i = 1; i <= this.numberMatches; i++) {
            const button = new Sprite();
            button.texture = Assets.get("button" + i);
            button.anchor = .5;
            button.scale = .3;
            button.x = this.startPositionX + 200* i;
            button.y = this.startPositionY;
            button.interactive = true;
            this.parentForMatches.addChild(button);
            this.collectionButton.push(button);
        }
    }
}