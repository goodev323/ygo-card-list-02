import { ToggleButton, useMediaQuery } from "@mui/material";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/system/useTheme";
import { MouseEvent } from "react";

type Props<T extends string> = {
  items: readonly T[];
  columnCount?: number;
} & (
  | {
      exclusive: true;
      value: T | null;
      onChange: (e: MouseEvent, value: T) => void;
    }
  | {
      exclusive: false;
      value: T[];
      onChange: (e: MouseEvent, value: T[]) => void;
    }
);

export const FilterToggleButton = <T extends string>({
  items,
  columnCount = items.length,
  exclusive,
  value,
  onChange,
}: Props<T>) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const displayColumnSize = matches && columnCount > 3 ? 3 : columnCount;

  const groupedButtonStyle = {
    [`& .MuiToggleButtonGroup-grouped:first-of-type`]: {
      borderBottomLeftRadius: 0,
    },
    [`& .MuiToggleButtonGroup-grouped:last-of-type`]: {
      borderTopRightRadius: 0,
    },
    [`& .MuiToggleButtonGroup-grouped:nth-of-type(${displayColumnSize}n + 1)`]:
      {
        marginLeft: 0,
        borderLeft: "1px solid rgba(0, 0, 0, 0.12)",
      },
    [`& .MuiToggleButtonGroup-grouped:nth-of-type(n + ${
      displayColumnSize + 1
    })`]: {
      borderTop: "1px solid transparent",
    },
    [`& .MuiToggleButtonGroup-grouped:nth-of-type(${displayColumnSize}n + 1):nth-last-of-type(-n+${displayColumnSize})`]:
      {
        borderBottomLeftRadius: 4,
      },
    [`& .MuiToggleButtonGroup-grouped:nth-of-type(${displayColumnSize}n):nth-last-of-type(-n+${displayColumnSize})`]:
      {
        borderBottomRightRadius: 4,
      },
  };

  return (
    <ToggleButtonGroup
      onChange={onChange}
      value={value}
      defaultValue={value as string | string[]}
      exclusive={exclusive}
      sx={{
        mx: "auto",
        width: "100%",
        flexWrap: "wrap",
        ...groupedButtonStyle,
      }}
    >
      {items.map((item) => (
        <ToggleButton
          sx={{
            flexBasis: `calc(100% / ${displayColumnSize})`,
            border: "1px solid rgba(0, 0, 0, 0.12)",
          }}
          key={`button-${item}`}
          value={item}
        >
          <Typography
            sx={(theme) => {
              return {
                [theme.breakpoints.down("sm")]: {
                  fontSize: "3vw",
                },
                minWidth: 50,
              };
            }}
          >
            {item}
          </Typography>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
