export type YgoCommonFields = {
  id: number;
  name: string;
  nameKana: string;
  nameEnglish?: string;
  text: string;
  cardType: YgoCardType;
  limitRegulation: YgoLimitedRegulation;
};

export const YgoCardTypes = ["モンスター", "魔法", "罠"] as const;
export type YgoCardTypes = typeof YgoCardTypes;
export type YgoCardType = YgoCardTypes[number];

export const YgoLimitedRegulations = ["なし", "制限", "準制限"] as const;
export type YgoLimitedRegulations = typeof YgoLimitedRegulations;
export type YgoLimitedRegulation = YgoLimitedRegulations[number];
