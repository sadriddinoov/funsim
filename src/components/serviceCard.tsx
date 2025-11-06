import Image from "next/image";


interface Card {
  title: string;
  available: string;
  image: string;
}

export default function ServiceCard({ title, available, image }: Card) {
  console.log()
  return (
    <div className="bg-[#1C1C1C0D] flex items-center gap-2 md:gap-[10px] rounded-[12px] py-2 md:py-[5px] px-3 md:px-[15px]">
      <Image
        src={image}
        alt=""
        className={`${image?.src?.includes("calls")? "md:h-12 md:w-10 w-7" : "w-6 h-6 md:w-8 md:h-8"} `}
      />

      <div className="flex flex-col gap-1 md:gap-[5px]">
        <h3 className="text-[16px] md:text-[18px] font-medium text-[#1C1C1C]">
          {title}
        </h3>
        <p className="text-[14px] md:text-[16px] font-normal text-[#595959]">
          {available}
        </p>
      </div>
    </div>
  );
}
