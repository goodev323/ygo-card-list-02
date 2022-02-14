import { YgoCommonFields } from ".";

export type YgoMonsterCard = { cardType: "モンスター" } & YgoCommonFields &
  YgoMonsterFields;

export type YgoMonsterFields = {
  level: number;
  attack: number | "?";
  defence: number | "?";
  monsterType: YgoMonsterType;
  summonCondition: YgoSummonCondition;
  attribute: YgoMonsterAttribute;
  monsterRace: YgoMonsterRace;
  additionalType: YgoMonsterAdditionalType;
};

export const YgoMonsterCardTypes = ["通常", "効果"] as const;
export type YgoMonsterCardTypes = typeof YgoMonsterCardTypes;
export type YgoMonsterType = YgoMonsterCardTypes[number];

export const YgoSummonConditions = ["通常", "融合", "儀式"] as const;
export type YgoSummonConditions = typeof YgoSummonConditions;
export type YgoSummonCondition = YgoSummonConditions[number];

export const YgoMonsterAttributes = [
  "闇属性",
  "水属性",
  "地属性",
  "光属性",
  "風属性",
  "神属性",
  "炎属性",
] as const;
export type YgoMonsterAttributes = typeof YgoMonsterAttributes;
export type YgoMonsterAttribute = YgoMonsterAttributes[number];

export const YgoMonsterTypes = [
  "機械族",
  "戦士族",
  "悪魔族",
  "水族",
  "海竜族",
  "魔法使い族",
  "昆虫族",
  "天使族",
  "鳥獣族",
  "植物族",
  "ドラゴン族",
  "アンデット族",
  "爬虫類族",
  "獣戦士族",
  "獣族",
  "岩石族",
  "魚族",
  "雷族",
  "幻神獣族",
  "恐竜族",
  "炎族",
] as const;
export type YgoMonsterTypes = typeof YgoMonsterTypes;
export type YgoMonsterRace = YgoMonsterTypes[number];

export const YgoMonsterAdditionalTypes = [
  "スピリット",
  "トゥーン",
  "リバース",
] as const;
export type YgoMonsterAdditionalTypes = typeof YgoMonsterAdditionalTypes;
export type YgoMonsterAdditionalType = YgoMonsterAdditionalTypes[number];
