import { useTrapFilter } from "@/hooks/ygoCardFilter/useTrapFilter";
import { YgoTrapCondition, YgoTrapConditions } from "@/models/YgoCard";
import { FilterToggleButton } from "./FunctionalToggleButton";

export const TrapFilterArea = () => {
  const { trapFilterState, setTrapFilterState } = useTrapFilter();
  return (
    <>
      <FilterToggleButton<YgoTrapCondition>
        items={YgoTrapConditions}
        exclusive={true}
        value={trapFilterState.trapConditionFilter}
        onChange={(_e, trapConditionFilter) =>
          setTrapFilterState((prevState) => ({
            ...prevState,
            trapConditionFilter,
          }))
        }
      />
    </>
  );
};
