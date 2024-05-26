import {
  _decorator,
  CCInteger,
  Component,
  instantiate,
  Prefab,
  Node,
  Vec3,
  UITransform,
} from "cc";
import { PlaygroundCtrl } from "../data/PlaygroundCtrl";
import { RunwayCol } from "./RunwayCol";
const { ccclass, property } = _decorator;

@ccclass("Playground")
export class Playground extends Component {
  @property(Prefab)
  public RunwayPerfab: Prefab;

  @property(Prefab)
  public RunwayColPerfab: Prefab;

  @property(CCInteger)
  public RunwayMargin: number;

  start() {
    PlaygroundCtrl.instance.node = this.node;
    this.createRunWay();
  }

  update(deltaTime: number) {}

  createRunWay() {
    for (let i = 0; i < 5; i++) {
      const child = instantiate(this.RunwayPerfab);
      child.setPosition(new Vec3(0, this.RunwayMargin * i));
      this.createRunWayCol(child, i);
      this.node.addChild(child);
    }
  }

  createRunWayCol(node: Node, x: number) {
    for (let i = 0; i < 9; i++) {
      const child = instantiate(this.RunwayColPerfab);
      child.getComponent(RunwayCol).x = x;
      child.getComponent(RunwayCol).y = i;
      child.getComponent(RunwayCol).grid = `${x};${i}`;
      PlaygroundCtrl.instance.setRunwayData(
        child.getComponent(RunwayCol).grid,
        child
      );
      node.addChild(child);
    }
  }

  protected onDestroy(): void {}
}
