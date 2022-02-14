import { useResponsiveWidth } from "@/hooks/usePageWidth";
import { useSearchTextFilter } from "@/hooks/ygoCardFilter/useSearchTextFilter";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SortIcon from "@mui/icons-material/Sort";
import {
  AppBar,
  IconButton,
  InputBase,
  Slide,
  useScrollTrigger,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";

type Props = {
  handleClickFilter: () => void;
  handleClickSort: () => void;
};

export const AppHeader = ({ handleClickFilter, handleClickSort }: Props) => {
  const trigger = useScrollTrigger();
  const { appBarWidth } = useResponsiveWidth();
  const { setSearchTextFilterState } = useSearchTextFilter();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar sx={{ backgroundColor: "white", boxShadow: "none" }}>
        <Toolbar>
          <Paper
            component="form"
            sx={{
              px: 3,
              mx: "auto",
              mt: 4,
              gap: 1,
              display: "flex",
              alignItems: "center",
              height: 50,
              width: appBarWidth,
            }}
          >
            <InputBase
              placeholder="フリーテキスト検索"
              inputProps={{ "aria-label": "free-text-search" }}
              sx={{ ml: 1, flexGrow: 1 }}
              onChange={(e) => setSearchTextFilterState(e.target.value)}
            />
            <IconButton onClick={handleClickFilter} sx={{ my: "auto" }}>
              <FilterAltIcon color="primary" />
            </IconButton>
            <IconButton onClick={handleClickSort} sx={{ my: "auto" }}>
              <SortIcon color="primary" />
            </IconButton>
          </Paper>
        </Toolbar>
      </AppBar>
    </Slide>
  );
};
