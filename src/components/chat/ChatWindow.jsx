import React, { useState, useRef, useEffect } from "react";
import Message from "./Message";

// Heroicons React এর বদলে react-icons ব্যবহার করা হচ্ছে
import { HiOutlinePaperAirplane, HiOutlinePaperClip } from "react-icons/hi2"; // Heroicons 2 (Hi2)

const dummyMessages = {
  chat1: [
    {
      id: 1,
      text: "Hello! Is this apartment still available?",
      sender: "me",
      time: "10:20 AM",
    },
    {
      id: 2,
      text: "Yes, it is. Would you like to schedule a visit?",
      sender: "other",
      time: "10:25 AM",
    },
    {
      id: 3,
      text: "Sure, I can show you the apartment tomorrow.",
      sender: "other",
      time: "10:30 AM",
    },
    {
      id: 4,
      text: "Great! What time works for you?",
      sender: "me",
      time: "10:35 AM",
    },
    { id: 5, text: "How about 3 PM?", sender: "other", time: "10:40 AM" },
    {
      id: 6,
      text: "Sounds good. See you then!",
      sender: "me",
      time: "10:45 AM",
    },
  ],
  chat2: [
    {
      id: 1,
      text: "Is the price negotiable?",
      sender: "me",
      time: "Yesterday",
    },
  ],
};

const ChatWindow = ({ chatId, participantName }) => {
  const [messages, setMessages] = useState(dummyMessages[chatId] || []);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setMessages(dummyMessages[chatId] || []);
  }, [chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        text: newMessage,
        sender: "me",
        time: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  const handleAttachFile = () => {
    alert("File attachment functionality not implemented.");
  };

  if (!chatId) {
    return (
      <div className="flex h-full items-center justify-center text-gray-500">
        Select a chat to start messaging.
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((msg) => (
          <Message key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSendMessage}
        className="flex-shrink-0 border-t bg-gray-50 p-4"
      >
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleAttachFile}
            className="rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-200 hover:text-blue-500"
            title="Attach file"
          >
            <HiOutlinePaperClip className="h-6 w-6" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-full border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-full bg-blue-600 p-2 text-white transition-colors hover:bg-blue-700"
            title="Send message"
          >
            <HiOutlinePaperAirplane className="h-6 w-6 rotate-90 transform" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;
