import {BaseMediator} from "../../utils/mediator";
import {ButtonView} from "./buttonView";
import {ButtonsNotification} from "./buttonsNotification";

export class ButtonMediator extends BaseMediator {
    constructor() {
        super();
        this.catchUINotification();
    }

    catchOutNotification() {

    }

    catchUINotification() {
        this.subscribeToNotification(ButtonView.BUTTON_CLICK, (index) => {
            this.sendNotification(ButtonsNotification.BUTTON_CLICK, index);
        })
    }
}