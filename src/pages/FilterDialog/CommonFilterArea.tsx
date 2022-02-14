import { useCommonFilter } from "@/hooks/ygoCardFilter/useCommonFilter";
import {
  YgoCardType,
  YgoCardTypes,
  YgoLimitedRegulation,
  YgoLimitedRegulations,
} from "@/models/YgoCard";
import { FilterToggleButton } from "./FunctionalToggleButton";

export const CommonFilterArea = () => {
  const { commonFilterState, setCommonFilterState } = useCommonFilter();
  console.log(commonFilterState);
  return (
    <>
      <FilterToggleButton<YgoCardType>
        items={YgoCardTypes}
        exclusive={true}
        value={commonFilterState.cardTypeFilter}
        onChange={(_e, cardTypeFilter) =>
          setCommonFilterState((prevState) => ({
            ...prevState,
            cardTypeFilter,
          }))
        }
      />
      <FilterToggleButton<YgoLimitedRegulation>
        items={YgoLimitedRegulations}
        exclusive={false}
        value={commonFilterState.limitRegulationFilter}
        onChange={(_e, limitRegulationFilter) =>
          setCommonFilterState((prevState) => ({
            ...prevState,
            limitRegulationFilter,
          }))
        }
      />
    </>
  );
};
