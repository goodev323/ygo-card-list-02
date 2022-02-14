import { atom, useRecoilState, useResetRecoilState } from "recoil";

export const YgoDisplayableCardSizeState = atom<number>({
  key: "YgoDisplayableCardSize",
  default: 20,
});

export const useDisplayableCardSize = () => {
  const [displayableCardSize, setDisplayableCardSizeState] = useRecoilState(
    YgoDisplayableCardSizeState
  );
  const resetDisplayableCardSize = useResetRecoilState(
    YgoDisplayableCardSizeState
  );
  const incrementDisplayableCardSize = () => {
    setDisplayableCardSizeState((size) => size + 20);
  };

  return {
    displayableCardSize,
    displayableListHeight: (displayableCardSize / 20) * 20 * 200,
    incrementDisplayableCardSize,
    resetDisplayableCardSize,
  };
};
