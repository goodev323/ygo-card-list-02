import {
  YgoCard,
  YgoCardType,
  YgoLimitedRegulation,
  YgoLimitedRegulations,
} from "@/models/YgoCard";
import { useMemo } from "react";
import { atom, useRecoilState, useResetRecoilState } from "recoil";
import { YgoMagicCards, YgoMonsterCards, YgoTrapCards } from "./cards";

export type YgoCommonFilter = {
  cardTypeFilter: YgoCardType | null;
  limitRegulationFilter: YgoLimitedRegulation[];
};

export const YgoCommonFilterState = atom<YgoCommonFilter>({
  key: "YgoCommonFilter",
  default: {
    cardTypeFilter: null,
    limitRegulationFilter: [],
  },
});

export const useCommonFilter = () => {
  const [commonFilterState, setCommonFilterState] =
    useRecoilState(YgoCommonFilterState);
  const resetCommonFilterState = useResetRecoilState(YgoCommonFilterState);
  const commonFilteredCardList = useMemo(() => {
    return fetchByCommonFilter(commonFilterState);
  }, [commonFilterState]);
  return {
    commonFilteredCardList,
    commonFilterState,
    setCommonFilterState,
    resetCommonFilterState,
  };
};

export const fetchByCommonFilter = (filter: YgoCommonFilter) =>
  filterByLimitRegulation(fetchByCardType(filter), filter);

const fetchByCardType = ({ cardTypeFilter }: YgoCommonFilter) => {
  switch (cardTypeFilter) {
    case "モンスター":
      return YgoMonsterCards;
    case "魔法":
      return YgoMagicCards;
    case "罠":
      return YgoTrapCards;
    default:
      return [...YgoMonsterCards, ...YgoMagicCards, ...YgoTrapCards];
  }
};

const filterByLimitRegulation = (
  cards: YgoCard[],
  { limitRegulationFilter }: YgoCommonFilter
) => {
  if (
    limitRegulationFilter.length === 0 ||
    limitRegulationFilter.length === YgoLimitedRegulations.length
  ) {
    return cards;
  }
  return cards.filter(({ limitRegulation }) => {
    if (limitRegulationFilter.includes(limitRegulation)) {
      return true;
    }

    return false;
  });
};
