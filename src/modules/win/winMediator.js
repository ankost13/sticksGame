import {BaseMediator} from "../../utils/mediator";
import {WinNotification} from "./winNotification";
import {GameLogicMediator} from "../gameLogic/gameLogicMediator";

export class WinMediator extends BaseMediator {
    constructor() {
        super();
        this.catchOutNotification()
        this.catchInNotification()
    }

    catchOutNotification() {
        this.subscribeToNotification(WinNotification.SHOW_WIN, (data) => {
            let text = "Congrats,\nyou win !)"
           if (data === "comp") {
               text = "Unfortunately,\n   you lose :("
           }
            this.view.showTransition(text)
        })
    }

    catchInNotification() {
        this.subscribeToNotification(WinNotification.RESET_GAME, () => {
            this.sendNotification(GameLogicMediator.RESET_GAME)
        })
    }


}
