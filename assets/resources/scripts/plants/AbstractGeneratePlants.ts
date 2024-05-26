import {
  _decorator,
  CCFloat,
  EventMouse,
  EventTouch,
  ImageAsset,
  Node,
  Sprite,
  UIOpacity,
  v3,
  Vec3,
} from "cc";
import { GenerateItem } from "../common/GenerateItem";
import { ITEM_ENUM } from "../enum/item";
import { LoadUtils } from "../utils/LoadUtils";
import { RunwayCol } from "../playground/RunwayCol";
import { PlaygroundCtrl } from "../data/PlaygroundCtrl";
const { ccclass, property } = _decorator;

@ccclass("AbstractGeneratePlants")
export abstract class AbstractGeneratePlants extends GenerateItem {
  public type: ITEM_ENUM = ITEM_ENUM.PLANTS;

  @property({
    type: CCFloat,
    displayName: "选择栏冷却时间/秒",
  })
  public chooseCd: number;

  @property({
    type: [ImageAsset],
    displayName: "在选择栏的图",
  })
  public chooseAsset: ImageAsset[] = [];

  @property({
    type: [ImageAsset],
    displayName: "种下的图",
  })
  public plantAsset: ImageAsset[] = [];

  private _isInChooseBar: boolean;

  /**
   * 是否在选择栏
   */
  public get isInChooseBar() {
    return this._isInChooseBar;
  }

  public set isInChooseBar(val: boolean) {
    this._isInChooseBar = val;
    this.isToPlant = !val;
  }

  private _isToPlant: boolean;

  /**
   * 是否种下
   */
  public get isToPlant() {
    return this._isToPlant;
  }

  public set isToPlant(val: boolean) {
    this._isToPlant = val;
    this._isInChooseBar = !val;
  }

  protected start(): void {
    this.bindEvent();
  }

  protected onDestroy(): void {
    this.unbindEvent();
  }

  private bindEvent() {
    this.node.on(Node.EventType.MOUSE_DOWN, this.onChoose, this);
    this.node.on(Node.EventType.MOUSE_ENTER, this.onMouseEnter, this);
    this.node.on(Node.EventType.MOUSE_LEAVE, this.onMouseLeave, this);
  }

  private unbindEvent() {
    this.node.off(Node.EventType.MOUSE_DOWN, this.onChoose, this);
    this.node.off(Node.EventType.MOUSE_ENTER, this.onMouseEnter, this);
    this.node.off(Node.EventType.MOUSE_LEAVE, this.onMouseLeave, this);
  }

  private onMouseEnter(e: EventTouch) {
    if (this.isInChooseBar) {
      this.setOpacity(200);
      return;
    }
  }

  private onMouseLeave(e: EventTouch) {
    if (this.isInChooseBar) {
      this.setOpacity(255);
      return;
    }
  }

  private async onChoose(e: EventMouse) {
    if (e.getButton() !== EventMouse.BUTTON_LEFT) {
      return;
    }

    /** 浮动节点 */
    const floatNode = new Node();
    const originPos = e.getLocation();
    floatNode.setWorldPosition(v3(originPos.x, originPos.y, 0));
    floatNode.scale = v3(0.8, 0.8, 0);
    floatNode.addComponent(Sprite).spriteFrame =
      await LoadUtils.laodImageAssets(this.plantAsset[0]);

    /** 挂载节点 */
    const mounteNode = this.node.scene.getChildByPath("Canvas/Day");
    mounteNode.addChild(floatNode);
    mounteNode.on(Node.EventType.MOUSE_MOVE, _mouseMove, this);
    mounteNode.on(Node.EventType.MOUSE_DOWN, _mouseDown, this);

    // todo 将找到的col节点种上去
    let findRunwayNode: Node;

    /** 选择之后的移动鼠标事件 */
    function _mouseMove(_e: EventTouch) {
      const { x, y } = _e.getLocation();
      floatNode.setWorldPosition(v3(x, y, 0));
      findRunwayNode = PlaygroundCtrl.instance.findRunway(floatNode);
    }

    /** 选择之后种下的事件 */
    function _mouseDown(_e: EventMouse) {
      mounteNode.off(Node.EventType.MOUSE_MOVE, _mouseMove, this);
      mounteNode.off(Node.EventType.MOUSE_DOWN, _mouseDown, this);
      if (_e.getButton() !== EventMouse.BUTTON_LEFT) {
        floatNode.destroy();
        return;
      }
      if (!findRunwayNode) {
        floatNode.destroy();
        return;
      }
      PlaygroundCtrl.instance.clearLastFindRunwayCol();
      console.log("种下", findRunwayNode);
      findRunwayNode.getComponent(RunwayCol).addSeat(floatNode);
    }
  }

  setOpacity(num: number) {
    this.node.getComponent(UIOpacity).opacity = num;
  }
}
