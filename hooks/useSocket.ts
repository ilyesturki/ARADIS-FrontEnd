"use client"; // Ensure it runs only on the client side
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:3000"; // Update this for production

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const newSocket = io(SOCKET_URL); // Connect to the backend WebSocket server

    newSocket.on("connect", () => {
      console.log("✅ Connected to WebSocket server");
    });

    newSocket.on("message", (data: string) => {
      console.log("🔹 Server message:", data);
      setMessage(data);
    });

    return () => {
      newSocket.disconnect(); // Cleanup on unmount
    };
  }, []);

  return { socket, message };
};
