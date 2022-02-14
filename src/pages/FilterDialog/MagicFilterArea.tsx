import { useMagicFilter } from "@/hooks/ygoCardFilter/useMagicFilter";
import { YgoMagicCondition, YgoMagicConditions } from "@/models/YgoCard";
import { FilterToggleButton } from "./FunctionalToggleButton";

export const MagicFilterArea = () => {
  const { magicFilterState, setMagicFilterState } = useMagicFilter();
  return (
    <>
      <FilterToggleButton<YgoMagicCondition>
        items={YgoMagicConditions}
        exclusive={true}
        columnCount={4}
        value={magicFilterState.magicConditionFilter}
        onChange={(_e, magicConditionFilter) =>
          setMagicFilterState((prevState) => ({
            ...prevState,
            magicConditionFilter,
          }))
        }
      />
    </>
  );
};
