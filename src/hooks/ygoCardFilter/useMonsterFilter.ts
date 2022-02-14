import {
  YgoMonsterAdditionalType,
  YgoMonsterAttribute,
  YgoMonsterCard,
  YgoMonsterRace,
  YgoMonsterType,
  YgoSummonCondition,
} from "@/models/YgoCard";
import { useCallback } from "react";
import { atom, useRecoilState, useResetRecoilState } from "recoil";

export type YgoMonsterFilter = {
  levelFilter: [number, number];
  attackFilter: [number, number];
  defenceFilter: [number, number];
  monsterTypeFilter: YgoMonsterType | null;
  summonConditionsFilter: YgoSummonCondition | null;
  attributeFilter: YgoMonsterAttribute[];
  monsterRaceFilter: YgoMonsterRace[];
  additionalTypeFilter: YgoMonsterAdditionalType | null;
};

const YgoMonsterFilterState = atom<YgoMonsterFilter>({
  key: "YgoMonsterFilter",
  default: {
    attackFilter: [0, 5000],
    defenceFilter: [0, 5000],
    levelFilter: [0, 12],
    monsterTypeFilter: null,
    summonConditionsFilter: null,
    attributeFilter: [],
    monsterRaceFilter: [],
    additionalTypeFilter: null,
  },
});

export const useMonsterFilter = () => {
  const [monsterFilterState, setMonsterFilterState] = useRecoilState(
    YgoMonsterFilterState
  );
  const resetMonsterFilterState = useResetRecoilState(YgoMonsterFilterState);
  const monsterFilter = useCallback(
    (card: YgoMonsterCard) => {
      const {
        level,
        attack,
        defence,
        monsterType,
        summonCondition,
        attribute,
        monsterRace,
        additionalType,
      } = card;
      const {
        levelFilter,
        attackFilter,
        defenceFilter,
        monsterTypeFilter,
        summonConditionsFilter,
        attributeFilter,
        monsterRaceFilter,
        additionalTypeFilter,
      } = monsterFilterState;
      if (level < levelFilter[0] || levelFilter[1] < level) {
        return false;
      }
      if (attack === "?") {
        if (attackFilter[0] !== 0 || attackFilter[1] !== 5000) {
          return false;
        }
      } else {
        if (attack < attackFilter[0] || attackFilter[1] < attack) {
          return false;
        }
      }
      if (defence === "?") {
        if (defenceFilter[0] !== 0 || defenceFilter[1] !== 5000) {
          return false;
        }
      } else {
        if (defence < defenceFilter[0] || defenceFilter[1] < defence) {
          return false;
        }
      }
      if (monsterTypeFilter && monsterTypeFilter !== monsterType) {
        return false;
      }
      if (
        summonConditionsFilter &&
        summonConditionsFilter !== summonCondition
      ) {
        return false;
      }
      if (
        attributeFilter.length !== 0 &&
        !attributeFilter.includes(attribute)
      ) {
        return false;
      }
      if (
        monsterRaceFilter.length !== 0 &&
        !monsterRaceFilter.includes(monsterRace)
      ) {
        return false;
      }
      if (additionalTypeFilter && additionalTypeFilter !== additionalType) {
        return false;
      }
      return true;
    },
    [monsterFilterState]
  );
  return {
    monsterFilterState,
    setMonsterFilterState,
    monsterFilter,
    resetMonsterFilterState,
  };
};
