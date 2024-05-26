import { ImageAsset, SpriteFrame, resources } from "cc";

export namespace LoadUtils {
  export function laodImageAssets(url: String): Promise<SpriteFrame>;
  export function laodImageAssets(
    imageAssets: ImageAsset
  ): Promise<SpriteFrame>;
  export function laodImageAssets(value: String | ImageAsset) {
    return new Promise((resolve, reject) => {
      if (value instanceof ImageAsset) {
        resolve(SpriteFrame.createWithImage(value));
        return;
      }
      if (typeof value === "string") {
        resources.load(value, ImageAsset, (err: any, imageAsset) => {
          if (err) {
            resolve(SpriteFrame.createWithImage(imageAsset));
          } else {
            reject(err);
          }
        });
        return;
      }
      reject("[laodImageAssets] value type error");
    });
  }
}
