import { YgoMagicCard } from "./YgoMagicFields";
import { YgoMonsterCard } from "./YgoMonsterFields";
import { YgoTrapCard } from "./YgoTrapFields";

export * from "./YgoCommonFields";
export * from "./YgoMagicFields";
export * from "./YgoMonsterFields";
export * from "./YgoTrapFields";

export type YgoCard = YgoMonsterCard | YgoMagicCard | YgoTrapCard;
