"use client";

import { QRCodeCanvas } from "qrcode.react";

interface QrCodeProps {
  link: string;
}

export default function QrCode({ link }: QrCodeProps) {
  if (!link) return null; // agar link kelmasa hech narsa chiqarmaydi

  return (
    <div className="flex flex-col items-center gap-4">
      <QRCodeCanvas
        value={link}
        size={150} // QR code o‘lchami
        bgColor="#ffffff"
        fgColor="#000000"
        level="H"
        includeMargin={true}
      />
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        {/* {link} */}
      </a>
    </div>
  );
}
