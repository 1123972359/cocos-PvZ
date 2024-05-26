import { Node, Size, Sprite, UITransform, Vec3, v3 } from "cc";
import Single from "../common/Single";
import { PositionUtils } from "../utils/PositionUtils";
import { RunwayCtrl } from "./RunwayCtrl";

export class PlaygroundCtrl extends Single<PlaygroundCtrl>() {
  public node: Node;

  /**
   * 上一个找到的col的节点
   */
  private _lastFindRunwayColNode?: Node;

  /**
   * 跑道每一个位置的数据
   */
  public runwayData: Record<string, Node> = {};

  public setRunwayData(key: string, value: Node) {
    this.runwayData[key] = value;
  }

  /**
   * 根据世界坐标找到所靠近的跑道
   */
  public findRunway(node: Node): Node | undefined {
    for (let i = 0; i < this.node.children.length; i++) {
      if (this.node.children[i].name !== "Runway") {
        continue;
      }
      if (PositionUtils.nodeInRect(this.node.children[i], node)) {
        return this.findRunwayCol(this.node.children[i], node);
      }
    }
    this.clearLastFindRunwayCol();
  }

  /**
   * 根据世界坐标找到所靠近的跑道col
   * @param runwayNode 跑道col节点
   * @param targetNode 需要检测的节点
   */
  public findRunwayCol(runwayNode: Node, targetNode: Node): Node | undefined {
    for (let i = 0; i < runwayNode.children.length; i++) {
      if (PositionUtils.nodeInRect(runwayNode.children[i], targetNode)) {
        return this.saveLastFindRunwayCol(runwayNode.children[i], targetNode);
      }
    }
  }

  /**
   * 清除上一次的节点展示
   */
  public clearLastFindRunwayCol() {
    if (this._lastFindRunwayColNode) {
      RunwayCtrl.instance.setNodeChooseSpriteFrame(
        this._lastFindRunwayColNode,
        null
      );
    }
  }

  /**
   * 保存上一次的节点，然后需要将上一次的节点的展示清除
   * todo 如果col上面有植物则不展示
   */
  private saveLastFindRunwayCol(node: Node, targetNode?: Node) {
    this.clearLastFindRunwayCol();
    this._lastFindRunwayColNode = node;
    if (targetNode) {
      RunwayCtrl.instance.setNodeChooseSpriteFrame(
        node,
        targetNode.getComponent(Sprite).spriteFrame
      );
    }
    return node;
  }
}
