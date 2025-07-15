import {BaseMediator} from "../../utils/mediator";
import {MatchNotification} from "./matchNotification";
import {setAnimationTimeoutSync} from "../../utils/helperFunction";
import {MatchView} from "./matchView";
import {ButtonsNotification} from "../buttons/buttonsNotification";
import {WinNotification} from "../win/winNotification";

export class MatchMediator extends BaseMediator {
    constructor() {
        super();
        this.catchOutNotification();
        this.catchUINotification();
    }

    catchOutNotification() {
        this.subscribeToNotification(MatchNotification.CREATE_MATCHES, (data) => {
            this.view.createMatches(data);
        })
        this.subscribeToNotification(MatchNotification.DELETE_MATCH, async (numberDeleteMatches) => {
            this.view.deleteMatches(numberDeleteMatches);
            if (this.currentNumberMatches === 0) {
                this.sendNotification(WinNotification.SHOW_WIN, "comp")
                // console.error("COMPUTER are the winner")
            }
            await setAnimationTimeoutSync(2);
            if (this.currentNumberMatches > 0){
                this.sendNotification(MatchNotification.NOW_COMPUTER_STEP);
            }
        })
        this.subscribeToNotification(MatchNotification.COMPUTER_STEP, async (numberDeleteMatches) => {
            await this.sendNotification(MatchNotification.CHECK_NUMBER_MATCHES, {numberDeleteMatches: numberDeleteMatches, currentNumberMatches: this.currentNumberMatches});
            this.view.deleteMatches(this.numberDeleteMatches);
            console.error("comp", this.numberDeleteMatches)
            if (this.currentNumberMatches === 0) {
                this.sendNotification(WinNotification.SHOW_WIN, "you")
                // console.error("YOU are the winner")
            }
            await setAnimationTimeoutSync(0.5);
            this.sendNotification(ButtonsNotification.CHANGE_INTERACTIVE_ON_TRUE, this.currentNumberMatches);
        })
        this.subscribeToNotification(MatchNotification.SEND_NUMBER_MATCHES, (numberDeleteMatches) => {
            this.numberDeleteMatches = numberDeleteMatches;
        })
    }

    catchUINotification() {
        this.subscribeToNotification(MatchView.CURRENT_NUMBER_OF_MATCHES, (number) => {
            this.currentNumberMatches = number;
        })
    }


}