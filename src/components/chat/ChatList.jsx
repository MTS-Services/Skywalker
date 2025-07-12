import React from "react";
import { Link } from "react-router-dom";

const ChatList = ({ chats, onSelectChat, selectedChatId }) => {
  return (
    <div className="space-y-2 p-2">
      {chats.map((chat) => (
        <div
          key={chat.id}
          className={`flex cursor-pointer items-center rounded-lg p-3 transition-colors duration-150 hover:bg-gray-100 ${selectedChatId === chat.id ? "bg-blue-100" : ""}`}
          onClick={() => onSelectChat(chat.id, chat.participantName)} // participantName যোগ করা হয়েছে
        >
          <img
            src={chat.avatar || "https://via.placeholder.com/50"}
            alt={chat.participantName}
            className="mr-3 h-12 w-12 rounded-full border border-gray-200 object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">
                {chat.participantName}
              </h3>
              <span className="text-xs text-gray-500">
                {chat.lastMessageTime}
              </span>
            </div>
            <p className="truncate text-sm text-gray-600">{chat.lastMessage}</p>
            {chat.unreadCount > 0 && (
              <span className="mt-1 ml-auto block w-fit rounded-full bg-blue-500 px-2 py-0.5 text-xs font-semibold text-white">
                {chat.unreadCount}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
