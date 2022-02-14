import magics from "@/data/magics.json";
import monsters from "@/data/monsters.json";
import traps from "@/data/traps.json";
import { YgoMagicCard, YgoMonsterCard, YgoTrapCard } from "@/models/YgoCard";

export const YgoMagicCards = magics as YgoMagicCard[];
export const YgoMonsterCards = monsters as YgoMonsterCard[];
export const YgoTrapCards = traps as YgoTrapCard[];
