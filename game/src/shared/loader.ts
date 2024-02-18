import { Assets } from "pixi.js";
import { manifest } from "./manifest";

export async function loadAsset(): Promise<void> {
    await Assets.init({ manifest: manifest });
    const bundlesIds = manifest.bundles.map((bundle) => bundle.name);
    await Assets.loadBundle(bundlesIds);
}