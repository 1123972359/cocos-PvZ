import { Node, Sprite, SpriteFrame } from "cc";
import Single from "../common/Single";

export class RunwayCtrl extends Single<RunwayCtrl>() {
  /**
   * 设置选择栏植物之后鼠标移动时的展示
   */
  public setNodeChooseSpriteFrame(node: Node, spriteFrame: SpriteFrame | null) {
    node.getChildByName("Seat").getComponent(Sprite).spriteFrame = spriteFrame;
  }
}
