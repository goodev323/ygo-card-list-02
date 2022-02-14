import { YgoMagicCard, YgoMagicCondition } from "@/models/YgoCard";
import { useCallback } from "react";
import { atom, useRecoilState, useResetRecoilState } from "recoil";

export type YgoMagicFilter = {
  magicConditionFilter: YgoMagicCondition | null;
};

export const YgoMagicFilterState = atom<YgoMagicFilter>({
  key: "YgoMagicFilter",
  default: {
    magicConditionFilter: null,
  },
});

export const useMagicFilter = () => {
  const [magicFilterState, setMagicFilterState] =
    useRecoilState(YgoMagicFilterState);

  const resetMagicFilterState = useResetRecoilState(YgoMagicFilterState);
  const filterByMagicCondition = useCallback(
    (magicCondition: YgoMagicCondition) => {
      const { magicConditionFilter } = magicFilterState;
      if (magicConditionFilter && magicConditionFilter !== magicCondition) {
        return false;
      }
      return true;
    },
    [magicFilterState.magicConditionFilter]
  );

  const magicFilter = useCallback(
    ({ magicCondition }: YgoMagicCard) => {
      return filterByMagicCondition(magicCondition);
    },
    [filterByMagicCondition]
  );
  return {
    magicFilterState,
    setMagicFilterState,
    magicFilter,
    resetMagicFilterState,
  };
};
