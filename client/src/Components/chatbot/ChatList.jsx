import React from "react";

const ChatList = ({ chats, selectChat }) => {
  return (
    <aside className="aside_chat">
      <ul id="chat-list">
        {chats.map((chat) => (
          <li key={chat.id} onClick={() => selectChat(chat.id)}>
            <img className="avatar" src={chat.avatar} alt={chat.username} />
            <p className="username">{chat.username}</p>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default ChatList;
