import { YgoCard } from "@/models/YgoCard";
import { useMediaQuery } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import useTheme from "@mui/system/useTheme";
import { CardListItem } from "./CardListItem";

type Props = {
  card: YgoCard | null;
  onClose: () => void;
};

export const CardDialog = ({ card, onClose }: Props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog open={!!card} onClose={onClose}>
      <DialogContent>
        {card && (
          <CardListItem
            card={card}
            isListView={false}
            viewDirection={matches ? "column" : "row"}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
