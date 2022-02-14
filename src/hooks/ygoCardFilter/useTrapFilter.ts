import { YgoTrapCard, YgoTrapCondition } from "@/models/YgoCard";
import { useCallback } from "react";
import { atom, useRecoilState, useResetRecoilState } from "recoil";

export type YgoTrapFilter = {
  trapConditionFilter: YgoTrapCondition | null;
};

export const YgoTrapFilterState = atom<YgoTrapFilter>({
  key: "YgoTrapFilter",
  default: {
    trapConditionFilter: null,
  },
});

export const useTrapFilter = () => {
  const [trapFilterState, setTrapFilterState] =
    useRecoilState(YgoTrapFilterState);
  const resetTrapFilterState = useResetRecoilState(YgoTrapFilterState);
  const filterByTrapCondition = useCallback(
    (trapCondition: YgoTrapCondition) => {
      const { trapConditionFilter } = trapFilterState;
      if (trapConditionFilter && trapConditionFilter === trapCondition) {
        return false;
      }
      return true;
    },
    [trapFilterState]
  );

  const trapFilter = useCallback(
    ({ trapCondition }: YgoTrapCard) => {
      return filterByTrapCondition(trapCondition);
    },
    [filterByTrapCondition]
  );
  return {
    trapFilterState,
    setTrapFilterState,
    trapFilter,
    resetTrapFilterState,
  };
};
