import { useEffect } from "react";
import { socket } from "./socketClient";
import { SOCKET_EVENTS } from "./socketEvents";

type EventHandlers = {
  onOrderData?: (data: any) => void;
  onOrderUpdated?: (data: any) => void;
  onError?: (data: any) => void;
  onDisconnect?: (reason: string) => void;
  onConnect?: (socketId: any) => void;
};

export const useOrderSocket = ({
  onOrderData,
  onOrderUpdated,
  onDisconnect,
  onConnect,
  onError,
}: EventHandlers) => {
  useEffect(() => {
    if (!socket.connected) socket.connect();

    socket.on("connect", () => {
      onConnect?.(socket?.id);
    });

    if (onOrderData) {
      socket.on(SOCKET_EVENTS.ORDER_DATA, onOrderData);
    }

    if (onOrderUpdated) {
      socket.on(SOCKET_EVENTS.ORDER_UPDATED, onOrderUpdated);
    }

    if (onError) {
      socket.on(SOCKET_EVENTS.ERROR, onError);
    }

    socket.on("disconnect", (reason) => {
      onDisconnect?.(reason);
    });

    return () => {
      socket.off(SOCKET_EVENTS.ORDER_DATA, onOrderData!);
      socket.off(SOCKET_EVENTS.ORDER_UPDATED, onOrderUpdated!);
      socket.off("disconnect", onDisconnect!);
    };
  }, [onOrderData, onOrderUpdated, onDisconnect, onConnect]);
};
