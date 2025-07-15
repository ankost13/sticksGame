import {BaseMediator} from "../../utils/mediator";
import {WinNotification} from "./winNotification";

export class WinMediator extends BaseMediator {
    constructor() {
        super();
        this.catchOutNotification()
    }

    catchOutNotification() {
        this.subscribeToNotification(WinNotification.SHOW_WIN, (data) => {
            let text = "Congrats, you win !)"
           if (data === "comp") {
               text = "Unfortunately, you lose :("
           }
            console.error(this.view)
            this.view.createPopupContainer(text)
        })
    }


}
