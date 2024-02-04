import { SceneManager } from './shared/scene-manager';
import { LoaderScene } from './scenes/loader';
import { FILL_COLOR } from './shared/constants';

SceneManager.init(FILL_COLOR);

SceneManager.changeScene(new LoaderScene());