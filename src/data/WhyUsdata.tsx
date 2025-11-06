import { ASSETS } from "../assets";


export const getWhyUSCarddata = (t: (key: string) => string) => [
    { title: t("why.card1_title"), subtitle: t("why.card1_subtitle"), img: ASSETS.why1 },
    { title: t("why.card2_title"), subtitle: t("why.card2_subtitle"), img: ASSETS.why2 },
    { title: t("why.card3_title"), subtitle: t("why.card3_subtitle"), img: ASSETS.why3 },
    { title: t("why.card4_title"), subtitle: t("why.card4_subtitle"), img: ASSETS.why4 }
  ];
  