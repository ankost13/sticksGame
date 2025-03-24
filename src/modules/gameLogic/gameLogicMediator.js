import {BaseMediator} from "../../utils/mediator";
import {ButtonsNotification} from "../buttons/buttonsNotification";
import {MatchNotification} from "../match/matchNotification";
import {randomInteger} from "../../utils/helperFunction";

export class GameLogicMediator extends BaseMediator {

    constructor() {
        super();
        this.startGame();
        this.catchNotification();

    }

    startGame() {
        this.sendNotification(MatchNotification.CREATE_MATCHES, this.proxy.getNumberMatches());
    }

    catchNotification() {
        this.subscribeToNotification(ButtonsNotification.BUTTON_CLICK, (index) => {
            this.sendNotification(MatchNotification.DELETE_MATCH, index)
        })
        this.subscribeToNotification(MatchNotification.NOW_COMPUTER_STEP, () => {
            this.computerStep();
        })
        this.subscribeToNotification(MatchNotification.CHECK_NUMBER_MATCHES, (data) => {
            this.sendNotification(MatchNotification.SEND_NUMBER_MATCHES, this.checkNumberMatches(data));
        })
    }

    computerStep() {
        this.numberDeleteMatches = randomInteger(1, 3);
        this.sendNotification(MatchNotification.COMPUTER_STEP, this.numberDeleteMatches);
    }

    checkNumberMatches(data) {
        if (data.currentNumberMatches === 0) {
            data.numberDeleteMatches = 0;
        } else if (data.currentNumberMatches === 1) {
            data.numberDeleteMatches = 1;
        } else if (data.currentNumberMatches === 2)  {
            data.numberDeleteMatches = data.currentNumberMatches - 1;
        } else if (data.currentNumberMatches === 3) {
            data.numberDeleteMatches = data.currentNumberMatches - 1;
        }
        return data.numberDeleteMatches;
    }

    resetGame() {

    }

}

