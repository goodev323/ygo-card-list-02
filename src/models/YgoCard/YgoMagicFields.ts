import { YgoCommonFields } from "./YgoCommonFields";

export type YgoMagicCard = { cardType: "魔法" } & YgoCommonFields &
  YgoMagicFields;

export type YgoMagicFields = {
  magicCondition: YgoMagicCondition;
};

export const YgoMagicConditions = [
  "通常",
  "永続",
  "フィールド",
  "装備",
  "速攻",
  "儀式",
] as const;
export type YgoMagicConditions = typeof YgoMagicConditions;
export type YgoMagicCondition = YgoMagicConditions[number];
