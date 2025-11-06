import { useTranslations } from "next-intl";

interface InfoItemProps {
  titleKey: string;
  contentKey: string;
  hasBorder?: boolean;
  isThree?: boolean;
}

const InfoItem = ({
  titleKey,
  contentKey,
  hasBorder = true,
  isThree = false,
}: InfoItemProps) => {
  const t = useTranslations(""); // ✅ namespace "main"

  const renderContent = () => {
    if (contentKey.includes("active")) {
      const titles = isThree
        ? [
            `${contentKey}-title`,
            `${contentKey}-title1`,
            `${contentKey}-title2`,
          ]
        : [
            `${contentKey}-title`,
            `${contentKey}-title1`,
            `${contentKey}-title2`,
            `${contentKey}-title3`,
          ];

      return titles.map((key, index) => (
        <span key={key}>
          {t(key)}
          {index < titles.length - 1 && <br />}
        </span>
      ));
    }
    return t(`${contentKey}-title`);
  };

  return (
    <div
      className={`flex flex-col md:flex-row gap-2 sm:gap-[175px] ${
        hasBorder
          ? "pb-1 border-b border-b-[#E4E4E433] mt-4 sm:mt-3"
          : "mt-4 sm:mt-3"
      }`}
    >
      <h2 className="font-normal text-base sm:text-lg text-[#FFFFFF] w-full md:w-40">
        {t(titleKey)}
      </h2>
      <p className="max-w-full sm:max-w-[485px] text-[#B9B9B9] text-sm sm:text-[16px]/[18px] font-normal">
        {renderContent()}
      </p>
    </div>
  );
};

export default InfoItem;
