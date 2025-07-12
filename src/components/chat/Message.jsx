import React from "react";

const Message = ({ message }) => {
  const isMyMessage = message.sender === "me";
  const messageClass = isMyMessage
    ? "bg-blue-500 text-white self-end rounded-bl-xl rounded-tl-xl rounded-tr-sm"
    : "bg-gray-200 text-gray-800 self-start rounded-br-xl rounded-tr-xl rounded-tl-sm";

  return (
    <div className={`flex ${isMyMessage ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[70%] rounded-xl p-3 shadow-sm ${messageClass}`}>
        <p className="text-sm">{message.text}</p>
        <span
          className={`mt-1 block text-xs ${isMyMessage ? "text-blue-100" : "text-gray-500"} text-right`}
        >
          {message.time}
        </span>
        {/* মিডিয়া মেসেজের জন্য (যদি ভবিষ্যতে যোগ করতে চান) */}
        {/* {message.mediaUrl && (
          <div className="mt-2">
            {message.mediaType === 'image' && (
              <img src={message.mediaUrl} alt="shared media" className="max-w-full h-auto rounded-md" />
            )}
            {message.mediaType === 'video' && (
              <video controls src={message.mediaUrl} className="max-w-full h-auto rounded-md">
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Message;
