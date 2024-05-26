import {
  _decorator,
  CCInteger,
  Component,
  ImageAsset,
  instantiate,
  Node,
  Prefab,
  rect,
  resources,
  size,
  Sprite,
  SpriteFrame,
  UITransform,
} from "cc";
import { AbstractGeneratePlants } from "../plants/AbstractGeneratePlants";
import { LoadUtils } from "../utils/LoadUtils";
const { ccclass, property } = _decorator;

@ccclass("ChooseBar")
export class ChooseBar extends Component {
  @property(CCInteger)
  public max: number;

  @property([Prefab])
  public itemsPrefab: Prefab[] = [];

  @property({
    type: Node,
    displayName: "选择植物挂载节点",
  })
  public itemsMountedNode: Node;

  start() {
    this.itemsPrefab.forEach(async (item) => {
      const node = instantiate(item);
      const script = node.components.find(
        (it) => it instanceof AbstractGeneratePlants
      ) as AbstractGeneratePlants;
      script.isInChooseBar = true;
      const sprite = node.getComponent(Sprite);
      sprite.spriteFrame = await LoadUtils.laodImageAssets(
        script.chooseAsset[0]
      );
      this.itemsMountedNode.addChild(node);
    });
  }

  update(deltaTime: number) {}
}
