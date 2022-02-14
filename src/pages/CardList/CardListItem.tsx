import { YgoCard } from "@/models/YgoCard/";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Suspense } from "react";
import { CardImageFetchBox } from "./ImageFetchBox";

type Props = {
  card: YgoCard;
  onClickImage?: () => void;
  isListView: boolean;
  viewDirection: "column" | "row";
};

export const CardListItem = ({
  card,
  onClickImage,
  isListView,
  viewDirection,
}: Props) => {
  const { name, nameKana, nameEnglish, text, limitRegulation, cardType } = card;

  const CardDetailInfo = () => {
    if (cardType === "モンスター") {
      const {
        attack,
        defence,
        attribute,
        summonCondition,
        monsterRace,
        additionalType,
      } = card;
      return (
        <Box>
          <Typography variant="body2">
            攻撃:{attack} / 守備:{defence}
          </Typography>
          <Typography variant="body2">
            {attribute} / {monsterRace}
          </Typography>
          <Typography variant="body2">
            召喚条件: {summonCondition}
            {additionalType && ` / ${additionalType}`}
          </Typography>
        </Box>
      );
    } else if (cardType === "魔法") {
      const { magicCondition } = card;
      return <Typography variant="body2">{magicCondition}魔法</Typography>;
    } else if (cardType === "罠") {
      const { trapCondition } = card;
      return <Typography variant="body2">{trapCondition}トラップ</Typography>;
    }
    return null;
  };
  return (
    <Box
      my={viewDirection === "row" ? 3 : 1}
      display="flex"
      flexDirection={viewDirection}
    >
      <Box
        my={viewDirection === "row" ? "auto" : 0}
        mx={viewDirection === "row" ? 3 : "auto"}
        sx={{ cursor: onClickImage ? "pointer" : "none" }}
        component="a"
        onClick={onClickImage}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <CardImageFetchBox nameEnglish={nameEnglish} />
        </Suspense>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        my="auto"
        mt={viewDirection === "column" ? 2 : "auto"}
        ml={viewDirection === "row" ? 3 : 0}
      >
        <Typography variant="subtitle2">{nameKana}</Typography>
        <Typography
          variant="subtitle1"
          sx={{
            fontSize: `calc(min(40vw / ${name.length}, 1rem))`,
          }}
        >
          {name}
        </Typography>
        <Box>
          <CardDetailInfo />
        </Box>
        <Typography variant="body2">制限: {limitRegulation}</Typography>
        <Box
          mt={1}
          sx={
            isListView
              ? { height: cardType === "モンスター" ? 45 : 60 }
              : undefined
          }
        >
          <Typography
            variant="body2"
            sx={
              isListView
                ? {
                    height: cardType === "モンスター" ? 45 : 60,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: cardType === "モンスター" ? "3" : "4",
                    WebkitBoxOrient: "vertical",
                  }
                : undefined
            }
          >
            {text}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
