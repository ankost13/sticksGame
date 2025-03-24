import {BaseMediator} from "../../utils/mediator";
import {ButtonView} from "./buttonView";
import {ButtonsNotification} from "./buttonsNotification";

export class ButtonMediator extends BaseMediator {
    constructor() {
        super();
        this.catchUINotification();
        this.catchOutNotification();
    }

    catchOutNotification() {
        this.subscribeToNotification(ButtonsNotification.CHANGE_INTERACTIVE_ON_TRUE, (numberOpenButton) => {
            if (numberOpenButton === 1) {
                this.view.setInteractiveOnMatches(true, 1);
            } else if (numberOpenButton === 2) {
                this.view.setInteractiveOnMatches(true, 2);
                this.view.setInteractiveOnMatches(true, 1);
            } else if (numberOpenButton >= 3) {
                this.view.setInteractiveOnMatches(true, 3);
                this.view.setInteractiveOnMatches(true, 2);
                this.view.setInteractiveOnMatches(true, 1);
            }
        });

        this.subscribeToNotification(ButtonsNotification.CHANGE_INTERACTIVE_ON_FALSE, (numberCloseButton) => {
            if (numberCloseButton === 3) {
                this.view.setInteractiveOnMatches(false, 3);
            } else if (numberCloseButton === 2) {
                this.view.setInteractiveOnMatches(false, 3);
                this.view.setInteractiveOnMatches(false, 2);
            } else if (numberCloseButton === 1) {
                this.view.setInteractiveOnMatches(false, 3);
                this.view.setInteractiveOnMatches(false, 2);
                this.view.setInteractiveOnMatches(false, 1);

            }
        })
    }

    catchUINotification() {
        this.subscribeToNotification(ButtonView.BUTTON_CLICK, (index) => {
            this.sendNotification(ButtonsNotification.BUTTON_CLICK, index);
        });
    }
}