import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ChatWindow from "../components/chat/ChatWindow";

// ডামি চ্যাট ডেটা: আপনার বাস্তব API থেকে ডেটা আসবে
const dummyChats = [
  { id: "chat1", participantName: "Mr. Alam (Apartment Ad)" },
  { id: "chat2", participantName: "Rahim Khan (Car Ad)" },
  { id: "chat3", participantName: "Property Management" },
];

const PrivateChatPage = () => {
  const { chatId } = useParams(); // URL থেকে চ্যাট আইডি নেয়
  const navigate = useNavigate(); // নেভিগেট করার জন্য

  const currentChat = dummyChats.find((chat) => chat.id === chatId); // আইডি দিয়ে চ্যাট খুঁজে বের করে

  if (!chatId || !currentChat) {
    // যদি কোনো চ্যাট আইডি না থাকে বা চ্যাট না পাওয়া যায়, তাহলে চ্যাট লিস্টে ফিরে যান
    navigate("/chat");
    return null;
  }

  return (
    // উচ্চতা নির্ধারণ করা হয়েছে যেন ফুটারের উপরে থাকে (যদি আপনার ফুটার 16 ইউনিট উচ্চতা নেয়)
    <div className="flex h-[calc(100vh-theme(spacing.16))] flex-col">
      {/* হেডার: চ্যাট উইন্ডোর জন্য (মোবাইলের জন্য) */}
      <header className="flex flex-shrink-0 items-center border-b bg-white p-4 shadow-sm">
        <button
          onClick={() => navigate("/chats")}
          className="mr-2 text-gray-600 hover:text-gray-900"
        >
          {/* ফিরে যাওয়ার আইকন */}
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </button>
        <h1 className="text-xl font-bold text-gray-800">
          Chat with {currentChat.participantName}
        </h1>
      </header>

      {/* চ্যাট উইন্ডো */}
      <div className="flex-1 overflow-y-auto">
        <ChatWindow
          chatId={chatId}
          participantName={currentChat.participantName}
        />
      </div>
    </div>
  );
};

export default PrivateChatPage;
