import { Container, Assets } from 'pixi.js'
import { LoadingBarContainer } from '../containers/loading-bar-container';
import { SceneManager, IScene } from '../shared/scene-manager';
import { Game3Scene } from './game/game3';
import { manifest } from '../shared/manifest';

export class LoaderScene extends Container implements IScene {
    private _loadingBar: LoadingBarContainer;

    constructor() {
        super();

        const loaderBarWidth = 280;
        this._loadingBar = new LoadingBarContainer(loaderBarWidth, SceneManager.width, SceneManager.height);

        this.addChild(this._loadingBar);
        this.initLoader().then(() => {
            this.loaded();
        });
    }

    async initLoader(): Promise<void> {
        await Assets.init({ manifest: manifest });
        const bundlesIds = manifest.bundles.map((bundle) => bundle.name);
        await Assets.loadBundle(bundlesIds, this.downloadProgress.bind(this));
    }

    private downloadProgress(progressRatio: number): void {
        this._loadingBar.scaleProgress(progressRatio);
    }

    private loaded(): void {
        SceneManager.changeScene(new Game3Scene(SceneManager.width, SceneManager.height))
    }

    update(_: number): void {
        //...
    }

    resize(_2: number, _1: number): void {
        //...
    }
}