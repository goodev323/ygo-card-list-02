import { YgoCard } from "@/models/YgoCard";
import { useCallback } from "react";
import { atom, useRecoilState } from "recoil";

export const YgoSearchTextFilterState = atom<string>({
  key: "YgoSearchTextFilter",
  default: "",
});

export const useSearchTextFilter = () => {
  const [searchTextFilterState, setSearchTextFilterState] = useRecoilState(
    YgoSearchTextFilterState
  );
  const searchTextFilter = useCallback(
    ({ name, nameKana, text }: YgoCard) => {
      if (!searchTextFilterState) {
        return true;
      }
      if (name.includes(searchTextFilterState)) {
        return true;
      }
      if (nameKana.includes(searchTextFilterState)) {
        return true;
      }
      if (text.includes(searchTextFilterState)) {
        return true;
      }
      return false;
    },
    [searchTextFilterState]
  );

  return { setSearchTextFilterState, searchTextFilter };
};
