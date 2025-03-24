import {randomInteger} from "../../utils/helperFunction";

let instance = null;

export class Proxy { //для даних

    constructor() {

    }

    static getInstance() {
        if (instance == null) {
            instance = new Proxy();
        }

        return instance;
    }

    getNumberMatches() {
        this.numberMatches = randomInteger(10, 20);
        return this.numberMatches;
    }
}

