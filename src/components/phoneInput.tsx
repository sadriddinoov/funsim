"use client";

import { useState } from "react";

export default function PhoneInput() {
  const [phone, setPhone] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // faqat raqamlarni qoldiramiz
    let digits = e.target.value.replace(/\D/g, "");

    // agar foydalanuvchi 7 dan boshlab yozsa (777...), uni olib tashlaymiz,
    // ichkarida faqat 10 ta raqam saqlaymiz (milliy qism)
    if (digits.startsWith("7")) {
      digits = digits.slice(1);
    }

    // maksimal 10 ta raqam: XXX XXX XX XX
    if (digits.length > 10) {
      digits = digits.slice(0, 10);
    }

    // agar umuman raqam yo'q bo'lsa — inputni tozalaymiz
    if (digits.length === 0) {
      setPhone("");
      return;
    }

    // Format: +7 XXX XXX XX XX
    let formatted = "+7";

    if (digits.length > 0) {
      formatted += " " + digits.slice(0, 3); // XXX
    }
    if (digits.length > 3) {
      formatted += " " + digits.slice(3, 6); // XXX
    }
    if (digits.length > 6) {
      formatted += " " + digits.slice(6, 8); // XX
    }
    if (digits.length > 8) {
      formatted += " " + digits.slice(8, 10); // XX
    }

    setPhone(formatted);
  };

  return (
    <input
      type="tel"
      value={phone}
      onChange={handleChange}
      // "+7 999 999 99 99" — 16 ta belgi, 17 emas
      maxLength={16}
      className="w-full bg-[#CFCFCF1F] px-4 py-2 text-[#1C1C1C] rounded-lg
                 focus:outline-none text-base sm:text-lg"
      placeholder="+7 999 999 99 99"
    />
  );
}
