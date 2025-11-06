"use client";

import { useEffect } from "react";
import { io } from "socket.io-client";

export function useOrderChannel(
  orderId: number | null,
  onStatus: (status: any) => void,
  onPayment: (payment: any) => void
) {
  useEffect(() => {
    if (!orderId) return;

    // 🔗 socket ulanish
    const socket = io("wss://crm.uztu.uz", {
      path: "/socket.io",
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("✅ WebSocket ochildi");

      // order kanaliga ulanish
      socket.emit("subscribe", { channel: `order.${orderId}` });
    });

    // 🔔 eventlarni tinglash
    socket.on("status.updated", (data) => {
      console.log("📩 Status yangilandi:", data);
      onStatus(data);
    });

    socket.on("payment.updated", (data) => {
      console.log("📩 Payment yangilandi:", data);
      onPayment(data);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ WebSocket xato:", err);
    });

    return () => {
      socket.disconnect();
    };
  }, [orderId, onStatus, onPayment]);
}
