import {
  YgoCard,
  YgoMagicCard,
  YgoMonsterCard,
  YgoTrapCard,
} from "@/models/YgoCard";
import { useCallback, useMemo } from "react";
import { useCommonFilter } from "./useCommonFilter";
import { useMagicFilter } from "./useMagicFilter";
import { useMonsterFilter } from "./useMonsterFilter";
import { useSearchTextFilter } from "./useSearchTextFilter";
import { useTrapFilter } from "./useTrapFilter";

export const useYgoCardFilter = () => {
  const { commonFilterState, commonFilteredCardList, resetCommonFilterState } =
    useCommonFilter();
  const { magicFilter, resetMagicFilterState } = useMagicFilter();
  const { trapFilter, resetTrapFilterState } = useTrapFilter();
  const { monsterFilter, resetMonsterFilterState } = useMonsterFilter();
  const { searchTextFilter } = useSearchTextFilter();

  const filteredCardList = useMemo(() => {
    let filteredCardList: YgoCard[];
    const { cardTypeFilter } = commonFilterState;
    if (cardTypeFilter === "モンスター") {
      filteredCardList = (commonFilteredCardList as YgoMonsterCard[]).filter(
        monsterFilter
      );
    } else if (cardTypeFilter === "魔法") {
      filteredCardList = (commonFilteredCardList as YgoMagicCard[]).filter(
        magicFilter
      );
    } else if (cardTypeFilter === "罠") {
      filteredCardList = (commonFilteredCardList as YgoTrapCard[]).filter(
        trapFilter
      );
    } else {
      filteredCardList = commonFilteredCardList;
    }
    return (
      filteredCardList
        // 最も時間がかかるため、最後にフィルタ
        .filter(searchTextFilter)
    );
  }, [
    commonFilteredCardList,
    monsterFilter,
    magicFilter,
    trapFilter,
    searchTextFilter,
  ]);

  const resetFilterState = useCallback(() => {
    resetCommonFilterState();
    resetMonsterFilterState();
    resetMagicFilterState();
    resetTrapFilterState();
  }, []);

  return {
    filteredCardList,
    resetFilterState,
  };
};
