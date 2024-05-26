import {
  _decorator,
  CCInteger,
  CCString,
  Component,
  Node,
  Sprite,
  v3,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("RunwayCol")
export class RunwayCol extends Component {
  @property(CCInteger)
  public x: number;

  @property(CCInteger)
  public y: number;

  @property(CCString)
  public grid: string = "-1;-1";

  /**
   * 该位置是否已种植
   */
  public isPlanted: boolean;

  /**
   * 种植座位
   * 可能有多个种在一个位置上
   */
  private seats: Node[] = [];

  addSeat(node: Node) {
    this.seats.push(node);
    const child = new Node();
    child.scale = v3(0.6, 0.6, 0);
    child.addComponent(Sprite).spriteFrame =
      node.getComponent(Sprite).spriteFrame;
    this.node.addChild(child);
    node.destroy();
    this.isPlanted = true;
  }

  clearSeats() {
    this.seats = [];
    this.isPlanted = false;
  }

  deleteSeat(node: Node) {
    const index = this.seats.findIndex((item) => item === node);
    if (index === -1) return;
    this.seats.splice(index, 1);
    if (this.seats.length === 0) this.isPlanted = false;
  }

  start() {}

  update(deltaTime: number) {}
}
