import {Application, Assets, Container} from "pixi.js";
import {manifest} from "../manifest";
import {GamePreloaderMediator} from "../modules/preloader/mediator";
import {PreloaderView} from "../modules/preloader/view";
import {GameMediator} from "./mediator";
import {SoundsManager} from "../utils/soundsManager";
import {BgMediator} from "../modules/bg/bgMediator";
import {BgView} from "../modules/bg/bgView";
import {MatchMediator} from "../modules/match/matchMediator";
import {MatchView} from "../modules/match/matchView";
import {ButtonView} from "../modules/buttons/buttonView";
import {ButtonMediator} from "../modules/buttons/buttonsMediator";
import {GameLogicMediator} from "../modules/gameLogic/gameLogicMediator";
import {WinMediator} from "../modules/win/winMediator";
import {WinView} from "../modules/win/winView";

export class App extends Application {

    constructor(data) {
        super(data)

        this.initGame();
    }

    async initGame() {
        this.registerPreloader();

        await this.initSounds();
        await this.loadAssets();
        this.registerBg();
        this.registerMatch();
        this.registerButtons();
        this.registerGameLogic();
        this.registerWin();

        this.gameMediator = new GameMediator();
        this.gameMediator.resourcesLoaded();
    }

    async loadAssets() {
        if (!Object.keys(manifest.bundles[0]).length) return;

        await Assets.init({manifest});
        for (const bundle of manifest.bundles) {
            await Assets.loadBundle(bundle.name);
        }
    }

    registerPreloader() {
        const mediator = new GamePreloaderMediator();
        const parent = new Container();
        this.stage.addChild(parent);
        mediator.initView(PreloaderView, parent);
    }

    registerBg() {
        const mediator = new BgMediator();
        const parent = new Container();
        this.stage.addChild(parent);
        mediator.initView(BgView, parent);
    }

    registerMatch() {
        const mediator = new MatchMediator();
        const parent = new Container();
        this.stage.addChild(parent);
        mediator.initView(MatchView, parent);
    }

    registerButtons() {
        const mediator = new ButtonMediator();
        const parent = new Container();
        this.stage.addChild(parent);
        mediator.initView(ButtonView, parent);
    }

    registerWin() {
        const mediator = new WinMediator();
        const parent = new Container();
        this.stage.addChild(parent);
        mediator.initView(WinView, parent);
    }

    registerGameLogic() {
        new GameLogicMediator();
    }

    async initSounds() {
        const sounds = [
            {
                name: "backgroundSound",
                src: "assets/sounds/fire.mp3",
                volume: 1,
                loop: true,
            },
            {
                name: "step",
                src: "assets/sounds/step.mp3",
                volume: 1,
            },
            {
                name: "transitionIN",
                src: "assets/sounds/transitionIN.mp3",
                volume: 1,
            },
            {
                name: "transitionOUT",
                src: "assets/sounds/transitionOUT.mp3",
                volume: 1,
            },
            {
                name: "click",
                src: "assets/sounds/click.mp3",
                volume: 1,
            },
        ];
        const soundsManager = SoundsManager.getInstance()
        await soundsManager.loadSounds(sounds);
    }
}
