import { Node, UITransform, Vec3, v3 } from "cc";

export namespace PositionUtils {
  /**
   * 判断一个点是否在矩形范围内
   * @param p1 矩形点1
   * @param p2 矩形点2
   * @param p3 目标点
   */
  export const pointInRect = (p1: Vec3, p2: Vec3, p3: Vec3) => {
    if (p3.x >= p1.x && p3.x <= p2.x && p3.y >= p1.y && p3.y <= p2.y) {
      return true;
    }
    return false;
  };

  /**
   * 判断一个点是否在矩形节点内
   * @param rect 矩形节点(中心点 [0, 0.5] | [0.5, 0.5] )
   * @param node 目标节点(中心点 [0.5, 0.5] )
   */
  export const nodeInRect = (rect: Node, node: Node) => {
    const contentSize = rect.getComponent(UITransform).contentSize;
    const anchorPoint = rect.getComponent(UITransform).anchorPoint;
    let p1: Vec3;
    let p2: Vec3;

    if (anchorPoint.x === 0 && anchorPoint.y === 0.5) {
      p1 = v3(
        rect.worldPosition.x,
        rect.worldPosition.y - contentSize.y / 2,
        0
      );
      p2 = v3(
        rect.worldPosition.x + contentSize.x,
        rect.worldPosition.y + contentSize.y / 2,
        0
      );
    } else if (anchorPoint.x === 0.5 && anchorPoint.y === 0.5) {
      p1 = v3(
        rect.worldPosition.x - contentSize.x / 2,
        rect.worldPosition.y - contentSize.y / 2,
        0
      );
      p2 = v3(
        rect.worldPosition.x + contentSize.x / 2,
        rect.worldPosition.y + contentSize.y / 2,
        0
      );
    } else {
      throw new Error("[nodeInRect] 中心点anchorPoint没有设置好规则");
    }

    const p3 = v3(node.worldPosition.x, node.worldPosition.y, 0);
    return pointInRect(p1, p2, p3);
  };
}
