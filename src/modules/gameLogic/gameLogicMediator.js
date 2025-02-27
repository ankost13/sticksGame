import {BaseMediator} from "../../utils/mediator";
import {ButtonsNotification} from "../buttons/buttonsNotification";

export class GameLogicMediator extends BaseMediator {

    constructor() {
        super();
        this.catchNotification();

    }

    startGame() {

    }

    catchNotification() {
        this.subscribeToNotification(ButtonsNotification.BUTTON_CLICK, (index) => {
            this. buttonsLogic(index)
        })
    }

    buttonsLogic(index) {

    }

    resetGame() {

    }

}

