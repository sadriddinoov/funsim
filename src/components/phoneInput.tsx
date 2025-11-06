"use client";

import { useState } from "react";

export default function PhoneInput() {
  const [phone, setPhone] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // faqat raqam qoldiramiz

    if (value.startsWith("998")) {
      value = value.slice(0, 12); // faqat 998 bilan boshlansa 12 ta raqam
    } else {
      value = "998" + value; // har doim +998 prefiksini qo'yamiz
      value = value.slice(0, 12);
    }

    let formatted = "+998";

    if (value.length > 3) formatted += " " + value.slice(3, 5);
    if (value.length > 5) formatted += " " + value.slice(5, 8);
    if (value.length > 8) formatted += " " + value.slice(8, 10);
    if (value.length > 10) formatted += " " + value.slice(10, 12);

    setPhone(formatted);
  };

  return (
    <input
      type="tel"
      value={phone}
      onChange={handleChange}
      maxLength={17} // +998 99 999 99 99 (17ta belgi bo'ladi)
      className="w-full bg-[#CFCFCF1F] px-4 py-2 text-[#1C1C1C] rounded-lg
                 focus:outline-none text-base sm:text-lg"
      placeholder="+998 99 999 99 99"
    />
  );
}
