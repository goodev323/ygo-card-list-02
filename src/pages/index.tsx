import { useDisplayableCardSize } from "@/hooks/useDisplayableCardSize";
import { useResponsiveWidth } from "@/hooks/usePageWidth";
import { useScrollBottomListener } from "@/hooks/useScrollBottomListener";
import { useYgoCardSort } from "@/hooks/useYgoCardSort";
import { useYgoCardFilter } from "@/hooks/ygoCardFilter";
import { Box } from "@mui/system";
import { useMemo, useState } from "react";
import { AppHeader } from "./AppHeader";
import { CardList } from "./CardList";
import { FilterDialog } from "./FilterDialog";
import { SortDialog } from "./SortDialog";

export const MainPage = () => {
  const {
    displayableCardSize,
    displayableListHeight,
    incrementDisplayableCardSize,
  } = useDisplayableCardSize();
  const { filteredCardList } = useYgoCardFilter();
  const { sorter } = useYgoCardSort();

  const { pageWidth } = useResponsiveWidth();

  const targetRef = useScrollBottomListener(
    incrementDisplayableCardSize,
    displayableListHeight
  );

  const cardList = useMemo(
    () => filteredCardList.sort(sorter).slice(0, displayableCardSize),
    [filteredCardList, sorter, displayableCardSize]
  );

  const [fileterDialogOpen, setFilterDialogOpen] = useState(false);
  const [sortDialogOpen, setSortDialogOpen] = useState(false);

  return (
    <>
      <AppHeader
        handleClickFilter={() => setFilterDialogOpen(true)}
        handleClickSort={() => setSortDialogOpen(true)}
      />
      <Box mt={10} mx="auto" ref={targetRef} sx={pageWidth}>
        <CardList cardList={cardList} />
      </Box>
      <FilterDialog open={fileterDialogOpen} setOpen={setFilterDialogOpen} />
      <SortDialog open={sortDialogOpen} setOpen={setSortDialogOpen} />
    </>
  );
};
