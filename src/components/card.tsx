import Image from "next/image";

interface CardProps {
  title: string;
  subtitle: string;
  img: string;
}

export default function Card({ title, subtitle, img }: CardProps) {
  return (
    <div
      className={`bg-[#1C1C1C0D] rounded-[12px] p-[20px] pb-[5px] flex flex-col  items-end`}
    >
      <div className="flex flex-col gap-[10px]">
        <h1 className="font-medium text-[#1C1C1C] text-[24px]/[24px]">
          {title}
        </h1>
        <p className="text-[#595959] font-normal text-[16px]">{subtitle}</p>
      </div>
      <div className="flex items-center justify-center mt-auto">
        <Image src={img} alt="" className="w-[151px] h-[151px]"/>
      </div>
    </div>
  );
}
