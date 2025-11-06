import Image from "next/image";

interface OtziveProps {
  writer: string;
  portrait: string;
  title: string;
  stars: number;
  description: string;
}

export const Otzive = ({
  writer,
  portrait,
  title,
  stars,
  description,
}: OtziveProps) => {
  return (
    <div className="md:bg-[#FFFFFF] bg-[#3D3E4078] p-[20px] rounded-lg shadow-md flex flex-col gap-[20px] w-full md:max-w-none max-w-[90%] mx-auto">
      <div className="flex items-center justify-between mb-[10px]">
        <div className="flex items-center">
          <Image
            src={portrait}
            alt={`${writer}'s portrait`}
            className="w-12 h-12 rounded-full mr-2 object-cover"
          />
          <span className="font-medium text-[#FFFFFF] md:text-[#1C1C1C] text-sm md:text-base">
            {writer}
          </span>
        </div>
        <div className="flex justify-center">
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className={`text-lg md:text-xl ${
                index < stars ? "text-[#F06F1E]" : "text-[#F06F1E47]"
              }`}
            >
              ★
            </span>
          ))}
        </div>
      </div>
      <h3 className="md:text-[24px] text-[18px] font-medium text-[#FFFFFF] md:text-[#1C1C1C] line-clamp-2">
        {title}
      </h3>
      <p className="md:text-[16px] text-[14px] text-[#FFFFFF] md:text-[#1C1C1C] line-clamp-3">
        {description}
      </p>
    </div>
  );
};
