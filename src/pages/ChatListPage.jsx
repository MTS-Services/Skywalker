import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ChatList from "../components/chat/ChatList";
import ChatWindow from "../components/chat/ChatWindow";
import { FaEvernote, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const dummyChats = [
  {
    id: "chat1",
    participantName: "Mr. Alam (Apartment Ad)",
    lastMessage: "Sure, I can show you the apartment tomorrow.",
    lastMessageTime: "10:30 AM",
    unreadCount: 1,
    avatar: "https://via.placeholder.com/50?text=MA",
  },
  {
    id: "chat2",
    participantName: "Rahim Khan (Car Ad)",
    lastMessage: "Is the price negotiable?",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
    avatar: "https://via.placeholder.com/50?text=RK",
  },
  {
    id: "chat3",
    participantName: "Property Management",
    lastMessage: "Your payment is due next week.",
    lastMessageTime: "01/07/2025",
    unreadCount: 0,
    avatar: "https://via.placeholder.com/50?text=PM",
  },
];

const ChatListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("chats");
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [selectedParticipantName, setSelectedParticipantName] = useState("");

  useEffect(() => {
    const pathSegments = location.pathname.split("/");
    if (pathSegments[1] === "chats" && pathSegments[2]) {
      const idFromUrl = pathSegments[2];
      const chat = dummyChats.find((c) => c.id === idFromUrl);
      if (chat) {
        setSelectedChatId(chat.id);
        setSelectedParticipantName(chat.participantName);
        setActiveTab("private_chat"); // যদি URL এ চ্যাট আইডি থাকে, তাহলে প্রাইভেট চ্যাট ট্যাব সক্রিয় করুন
      }
    }
  }, [location.pathname]);

  const handleSelectChat = (chatId, participantName) => {
    setSelectedChatId(chatId);
    setSelectedParticipantName(participantName);
    // মোবাইল ডিভাইসে হলে, /chats/:chatId রুটে নেভিগেট করুন
    if (window.innerWidth < 768) {
      // উদাহরণস্বরূপ, 768px এর নিচে মোবাইল ধরা হয়েছে
      navigate(`/chats/${chatId}`);
    } else {
      setActiveTab("private_chat"); // ডেস্কটপে ট্যাব সক্রিয় রাখুন
    }
  };

  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))] flex-col lg:flex-row">
      <div className="flex justify-between bg-white px-4 py-2 lg:hidden">
        <div
          className={`p-3 text-center font-medium ${activeTab === "private_chat" ? "border-b-2 border-[#0A3459] text-[#0A3459]" : "text-gray-600 hover:bg-gray-50"}`}
          onClick={() => setActiveTab("private_chat")}
        >
          <div>
            <h6 className="font-[600]">private_chat</h6>
          </div>
          <div className="jsu flex items-center gap-2">
            <FaUser className="h-6 w-8" />
            <MdEmail className="h-12 w-8" />
          </div>
        </div>

        <div className="flex items-center justify-center gap-3">
          <div
            className={`flex-1 text-center font-medium ${activeTab === "chats" ? "border-b-2 border-[#0A3459] text-[#0A3459]" : "text-gray-600 hover:bg-gray-50"}`}
            onClick={() => {
              setActiveTab("chats");
              setSelectedChatId(null);
            }}
          >
            <h6 className="text-[16px] font-[600]">lcoation</h6>
            <h6 className="text-[14px] font-[400]">مستثمر عقار</h6>
            <h6 className="text-[14px] font-[400]">Group chat</h6>
          </div>
          <div>
            <img src="public/logo.png" alt="" className="h-16 w-16" />
          </div>
        </div>
      </div>

      <div
        className={`w-full overflow-y-auto border-r bg-gray-50 lg:w-1/3 ${activeTab === "chats" ? "block" : "hidden"} lg:block`}
      >
        <ChatList
          chats={dummyChats}
          onSelectChat={handleSelectChat}
          selectedChatId={selectedChatId}
        />
      </div>
      <div
        className={`flex-1 ${activeTab === "private_chat" ? "block" : "hidden"} lg:block`}
      >
        {selectedChatId ? (
          <ChatWindow
            chatId={selectedChatId}
            participantName={selectedParticipantName}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-500">
            Select a chat to start messaging.
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatListPage;
