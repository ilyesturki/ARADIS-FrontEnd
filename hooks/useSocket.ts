"use client"; // Ensure it runs only on the client side
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

// ✅ Fixed WebSocket URL (Removed :8000)
const SOCKET_URL = "wss://aradis-backend.onrender.com"; // Use wss for secure WebSocket

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
      transports: ["websocket"], // Force WebSocket (avoid polling)
    });

    setSocket(newSocket); // ✅ Store socket in state

    newSocket.on("connect", () => {
      console.log("✅ Connected to WebSocket server");
    });

    // ✅ Updated event name to match the server
    newSocket.on("serverMessage", (data: string) => {
      console.log("🔹 Server message:", data);
      setMessage(data);
    });

    return () => {
      newSocket.disconnect(); // Cleanup on unmount
    };
  }, []);

  return { socket, message };
};
