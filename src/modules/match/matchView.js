import {View} from "../../utils/view";
import {Assets, Container, Sprite} from "pixi.js";
import gsap from 'gsap';
import {setAnimationTimeoutSync} from "../../utils/helperFunction";

export class MatchView extends View {
    static CURRENT_NUMBER_OF_MATCHES = "MatchView.CURRENT_NUMBER_OF_MATCHES";

    constructor(parent, resizeData) {
        super(parent, resizeData);
        this.collectionMatches = [];
    }

    createMatches(numberMatches) {
        this.parentForMatches = new Container();
        this.addChild(this.parentForMatches);
        this.startPositionX = this.size.width / 2 - 24 * numberMatches;
        this.startPositionY = this.size.height / 2 - 70;

        for (let i = 0; i < numberMatches; i++) {
            const match = new Sprite();
            match.texture = Assets.get("match");
            match.anchor = .5;
            match.x = this.startPositionX + 50 * i;
            match.y = this.startPositionY;
            this.parentForMatches.addChild(match);
            this.collectionMatches.push(match);
        }
        this.notifyToMediator(MatchView.CURRENT_NUMBER_OF_MATCHES, this.collectionMatches.length);
    }

    async deleteMatches(numberDeleteMatches) {
        for (let i = 1; i <= numberDeleteMatches; i++) {
            this.deleteAnimation(this.collectionMatches.length - 1)
            await setAnimationTimeoutSync(.2)
            this.parentForMatches.removeChild(this.collectionMatches[this.collectionMatches.length - 1]);
            this.collectionMatches[this.collectionMatches.length - 1].destroy({children: true});
            this.collectionMatches.pop();
        }
        this.notifyToMediator(MatchView.CURRENT_NUMBER_OF_MATCHES, this.collectionMatches.length);
    }

    deleteAnimation(number) {
        const target = this.collectionMatches[number];

        gsap.fromTo(
            target.scale,
            { x: target.scale.x, y: target.scale.y },
            {
                x: 0,
                y: 0,
                duration: .2,
                ease: "power2.in",
                onComplete: () => {
                    target.visible = false; // робимо невидимим після анімації
                }
            }
        );
    }

}