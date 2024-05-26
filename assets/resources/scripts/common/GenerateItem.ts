import { _decorator, CCFloat, CCInteger, Component, Node } from "cc";
import { ITEM_ENUM } from "../enum/item";
const { ccclass, property } = _decorator;

/**
 * 植物与僵尸的基类
 */
export abstract class GenerateItem extends Component {
  @property({
    type: CCInteger,
    displayName: "生命值",
  })
  public life: number;

  @property({
    type: CCInteger,
    displayName: "攻击力",
  })
  public attack: number;

  @property({
    type: CCFloat,
    displayName: "攻速/秒",
  })
  public attackSpeed: number;

  /**
   * 植物类型
   */
  abstract type: ITEM_ENUM;
}
