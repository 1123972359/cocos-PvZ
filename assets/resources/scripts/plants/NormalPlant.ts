import { _decorator } from "cc";
import { AbstractGeneratePlants } from "./AbstractGeneratePlants";
const { ccclass, property } = _decorator;

@ccclass("NormalPlant")
export class NormalPlant extends AbstractGeneratePlants {}
