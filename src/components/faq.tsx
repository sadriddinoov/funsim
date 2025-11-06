"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface FAQProps {
  title: string;
  question: string;
}

export default function FAQ({ title, question }: FAQProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`
        rounded-[12px] px-[23px] py-[15px] cursor-pointer transition-colors 
        ${open ? "bg-[#272727]" : "bg-[#1C1C1C0D]"} 
        w-[95%] 
        md:w-[90%] md:max-w-[500px] 
        lg:w-[500px] lg:max-w-[600px]
      `}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center  justify-between w-full gap-2">
        <h3
          className={`font-medium text-left text-lg ${
            open ? "text-[#FFFFFF]" : "text-[#1C1C1C]"
          } `}
        >
          {title}
        </h3>
        {open ? (
          <Minus className="text-[#F06F1E] shrink-0" size={20} />
        ) : (
          <Plus className="text-[#1C1C1C] shrink-0" size={20} />
        )}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden w-full pr-[30px]"
          >
            <p
              className={`mt-2 ${
                open ? "text-[#FFFFFF]" : "text-[#1C1C1C]"
              }  text-sm leading-relaxed w-full text-left`}
            >
              {question}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
