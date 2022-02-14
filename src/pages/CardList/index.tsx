import { YgoCard } from "@/models/YgoCard/";
import { CardListItem } from "@/pages/CardList/CardListItem";
import { ListItem } from "@mui/material";
import List from "@mui/material/List";
import { useState } from "react";
import { CardDialog } from "./CardDialog";

type Props = {
  cardList: YgoCard[];
};

export const CardList = ({ cardList }: Props) => {
  const [selectedCard, setSelectedCard] = useState<YgoCard | null>(null);
  return (
    <>
      <List>
        {cardList.map((card) => (
          <ListItem
            key={`item-${card.id}`}
            sx={{ height: 200, borderBottom: "solid .5px lightgrey" }}
          >
            <CardListItem
              card={card}
              onClickImage={() => setSelectedCard(card)}
              isListView={true}
              viewDirection="row"
            />
          </ListItem>
        ))}
      </List>
      <CardDialog card={selectedCard} onClose={() => setSelectedCard(null)} />
    </>
  );
};
