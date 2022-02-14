import { useYgoCardFilter } from "@/hooks/ygoCardFilter";
import { useCommonFilter } from "@/hooks/ygoCardFilter/useCommonFilter";
import { Divider } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useMemo } from "react";
import { CommonFilterArea } from "./CommonFilterArea";
import { MagicFilterArea } from "./MagicFilterArea";
import { MonsterFilterArea } from "./MonsterFilterArea";
import { TrapFilterArea } from "./TrapFilterArea";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const FilterDialog = ({ open, setOpen }: Props) => {
  const { commonFilterState } = useCommonFilter();
  const { cardTypeFilter } = commonFilterState;
  const { resetFilterState } = useYgoCardFilter();

  const CardTypeFilterArea = useMemo(() => {
    switch (cardTypeFilter) {
      case "モンスター":
        return <MonsterFilterArea />;
      case "魔法":
        return <MagicFilterArea />;
      case "罠":
        return <TrapFilterArea />;
      default:
        return null;
    }
  }, [cardTypeFilter]);

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
      <DialogTitle>カード検索</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <CommonFilterArea />
        {cardTypeFilter && <Divider />}
        {CardTypeFilterArea}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            resetFilterState();
          }}
        >
          リセット
        </Button>
        <Button onClick={() => setOpen(false)}>検索</Button>
      </DialogActions>
    </Dialog>
  );
};
