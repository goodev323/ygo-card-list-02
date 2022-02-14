import { YgoCommonFields } from ".";

export type YgoTrapCard = { cardType: "罠" } & YgoTrapFields & YgoCommonFields;
export type YgoTrapFields = {
  trapCondition: YgoTrapCondition;
};

export const YgoTrapConditions = ["通常", "永続", "カウンター"] as const;
export type YgoTrapConditions = typeof YgoTrapConditions;
export type YgoTrapCondition = YgoTrapConditions[number];
