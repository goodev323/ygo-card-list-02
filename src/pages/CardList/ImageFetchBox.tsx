import NoCardImage from "@/assets/no_card_image.png";
import { styled } from "@mui/material";
import useSWR from "swr";

type Props = {
  nameEnglish?: string;
};

const YGO_API_ENDPOINT = "https://db.ygoprodeck.com/api/v7/cardinfo.php";

const fetchCardImage = async (url: string) => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    const { data } = json;
    if (!Array.isArray(data)) {
      return null;
    }
    const record = data[0];
    const cardImages = record["card_images"];
    if (!Array.isArray(cardImages)) {
      return null;
    }
    return cardImages[0]["image_url_small"] as string;
  } catch (e) {
    console.log(e);
  }
  return null;
};

const Image = styled("img")({
  width: 100,
  height: "auto",
});

export const CardImageFetchBox = ({ nameEnglish }: Props) => {
  if (!nameEnglish) {
    return <Image src={NoCardImage} />;
  }

  const requestUrl = `${YGO_API_ENDPOINT}?name=${encodeURIComponent(
    nameEnglish
  )}`;
  const { data } = useSWR(requestUrl, fetchCardImage, { suspense: true });

  return <Image src={data || NoCardImage} />;
};
