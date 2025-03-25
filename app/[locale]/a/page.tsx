"use client";
import { useState } from "react";
import { useSocket } from "@/hooks/useSocket";

export default function WebSocketComponent() {
  const { socket, message } = useSocket();
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!socket) {
      console.warn("⚠️ Socket not connected yet!");
      return;
    }

    console.log(`📤 Sending: ${input}`);
    socket.emit("clientMessage", input); // ✅ Ensured socket exists before emitting
    setInput("");
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-bold">WebSocket Test</h2>
      <p>Server says: {message || "Waiting for server response..."}</p>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message"
        className="border p-2 rounded"
      />
      <button
        onClick={sendMessage}
        className="bg-blue-500 text-white p-2 rounded ml-2"
      >
        Send
      </button>
    </div>
  );
}
