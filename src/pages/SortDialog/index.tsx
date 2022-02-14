import { useYgoCardSort, YgoCardSort } from "@/hooks/useYgoCardSort";
import { useCommonFilter } from "@/hooks/ygoCardFilter/useCommonFilter";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const SortDialog = ({ open, setOpen }: Props) => {
  const { sortState, setSortState } = useYgoCardSort();
  const { commonFilterState } = useCommonFilter();
  const { cardTypeFilter } = commonFilterState;

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>ソート</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minWidth: 200,
            gap: 3,
          }}
        >
          <FormControl>
            <FormLabel>ソート順</FormLabel>
            <RadioGroup
              value={sortState.direction}
              onChange={(e) => {
                const direction = e.target.value as YgoCardSort["direction"];
                setSortState((prevState) => ({
                  ...prevState,
                  direction,
                }));
              }}
            >
              <FormControlLabel value="asc" control={<Radio />} label="昇順" />
              <FormControlLabel value="desc" control={<Radio />} label="降順" />
            </RadioGroup>
          </FormControl>
          <TextField
            select
            label="項目"
            value={sortState.target}
            onChange={(e) => {
              const target = e.target.value as YgoCardSort["target"];
              setSortState((prevState) => ({
                ...prevState,
                target,
              }));
            }}
            SelectProps={{
              native: true,
            }}
            variant="standard"
          >
            <option value="id">ID</option>
            <option value="nameKana">カード名</option>
            {cardTypeFilter && (
              <>
                <option value="level">レベル</option>
                <option value="attack">攻撃力</option>
                <option value="defence">守備力</option>
              </>
            )}
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>確定</Button>
      </DialogActions>
    </Dialog>
  );
};
