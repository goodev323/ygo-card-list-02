import { YgoCard, YgoMonsterCard } from "@/models/YgoCard";
import { useCallback } from "react";
import { atom, useRecoilState } from "recoil";
import { useCommonFilter } from "./ygoCardFilter/useCommonFilter";

export type YgoCardSort = {
  target: "id" | "nameKana" | "attack" | "defence" | "level";
  direction: "asc" | "desc";
};

const YgoCardSortState = atom<YgoCardSort>({
  key: "YgoCardSortState",
  default: {
    target: "id",
    direction: "asc",
  },
});

const compareFunc = (
  a: string | number,
  b: string | number,
  dir: "asc" | "desc"
) => {
  if (a === b) return 0;
  if (dir === "asc") return a > b ? 1 : -1;
  if (dir === "desc") return b > a ? 1 : -1;
  return 0; // not reach
};
export const useYgoCardSort = () => {
  const [sortState, setSortState] = useRecoilState(YgoCardSortState);
  const { commonFilterState } = useCommonFilter();
  const { cardTypeFilter } = commonFilterState;
  const sorter = useCallback(
    (a: YgoCard, b: YgoCard) => {
      if (cardTypeFilter !== "モンスター") {
        return sortState.target === "id"
          ? compareFunc(a.id, b.id, sortState.direction)
          : compareFunc(a.nameKana, b.nameKana, sortState.direction);
      } else {
        const aM = a as YgoMonsterCard;
        const bM = b as YgoMonsterCard;
        return compareFunc(
          aM[sortState.target],
          bM[sortState.target],
          sortState.direction
        );
      }
    },
    [cardTypeFilter, sortState]
  );
  return { sortState, setSortState, sorter };
};
