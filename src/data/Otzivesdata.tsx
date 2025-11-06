import { ASSETS } from "../assets";

export const getOtzivesData = (t: (key: string) => string) => [
    { writer: t("otzives.writer"), title: t("otzives.comment"),  portrait: ASSETS.portrait, stars: 3,  description: t("otzives.description")},
    { writer: t("otzives.writer"), title: t("otzives.comment"),  portrait: ASSETS.portrait, stars: 5,  description: t("otzives.description")},
    { writer: t("otzives.writer"), title: t("otzives.comment"),  portrait: ASSETS.portrait, stars: 0,  description: t("otzives.description")},
    { writer: t("otzives.writer"), title: t("otzives.comment"),  portrait: ASSETS.portrait, stars: 2,  description: t("otzives.description")},
    { writer: t("otzives.writer"), title: t("otzives.comment"),  portrait: ASSETS.portrait, stars: 4,  description: t("otzives.description")}
  ];
  