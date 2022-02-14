import { useMonsterFilter } from "@/hooks/ygoCardFilter/useMonsterFilter";
import {
  YgoMonsterAdditionalType,
  YgoMonsterAdditionalTypes,
  YgoMonsterAttribute,
  YgoMonsterAttributes,
  YgoMonsterCardTypes,
  YgoMonsterRace,
  YgoMonsterType,
  YgoMonsterTypes,
  YgoSummonCondition,
  YgoSummonConditions,
} from "@/models/YgoCard";
import { Slider, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { FilterToggleButton } from "./FunctionalToggleButton";

export const MonsterFilterArea = () => {
  const { monsterFilterState, setMonsterFilterState } = useMonsterFilter();
  return (
    <>
      <Box sx={{ mx: 2 }}>
        <Typography>攻撃力</Typography>
        <Slider
          value={monsterFilterState.attackFilter}
          onChange={(_e, value) => {
            setMonsterFilterState((prevState) => ({
              ...prevState,
              attackFilter: value as [number, number],
            }));
          }}
          step={100}
          min={0}
          max={5000}
          valueLabelDisplay="auto"
        />
      </Box>
      <Box sx={{ mx: 2 }}>
        <Typography>守備力</Typography>
        <Slider
          value={monsterFilterState.defenceFilter}
          onChange={(_e, value) => {
            setMonsterFilterState((prevState) => ({
              ...prevState,
              defenceFilter: value as [number, number],
            }));
          }}
          step={100}
          min={0}
          max={5000}
          valueLabelDisplay="auto"
        />
      </Box>
      <Box sx={{ mx: 2 }}>
        <Typography>レベル</Typography>
        <Slider
          value={monsterFilterState.levelFilter}
          onChange={(_e, value) => {
            setMonsterFilterState((prevState) => ({
              ...prevState,
              levelFilter: value as [number, number],
            }));
          }}
          step={1}
          min={1}
          max={12}
          valueLabelDisplay="auto"
        />
      </Box>
      <FilterToggleButton<YgoMonsterType>
        items={YgoMonsterCardTypes}
        exclusive={true}
        value={monsterFilterState.monsterTypeFilter}
        onChange={(_e, monsterTypeFilter) =>
          setMonsterFilterState((prevState) => ({
            ...prevState,
            monsterTypeFilter,
          }))
        }
      />
      <FilterToggleButton<YgoSummonCondition>
        items={YgoSummonConditions}
        exclusive={true}
        value={monsterFilterState.summonConditionsFilter}
        onChange={(_e, summonConditionsFilter) =>
          setMonsterFilterState((prevState) => ({
            ...prevState,
            summonConditionsFilter,
          }))
        }
      />
      <FilterToggleButton<YgoMonsterAttribute>
        items={YgoMonsterAttributes}
        columnCount={4}
        exclusive={false}
        value={monsterFilterState.attributeFilter}
        onChange={(_e, attributeFilter) =>
          setMonsterFilterState((prevState) => ({
            ...prevState,
            attributeFilter,
          }))
        }
      />
      <FilterToggleButton<YgoMonsterRace>
        items={YgoMonsterTypes}
        columnCount={4}
        exclusive={false}
        value={monsterFilterState.monsterRaceFilter}
        onChange={(_e, monsterTypeFilter) =>
          setMonsterFilterState((prevState) => ({
            ...prevState,
            monsterRaceFilter: monsterTypeFilter,
          }))
        }
      />
      <FilterToggleButton<YgoMonsterAdditionalType>
        items={YgoMonsterAdditionalTypes}
        exclusive={true}
        value={monsterFilterState.additionalTypeFilter}
        onChange={(_e, additionalTypeFilter) =>
          setMonsterFilterState((prevState) => ({
            ...prevState,
            additionalTypeFilter,
          }))
        }
      />
    </>
  );
};
