import React, { useEffect, useRef } from "react";

const ChatMessages = ({ chat, handleFormSubmit, messageInputRef }) => {
  const messageWrapRef = useRef(null);
  //   const messageInputRef = useRef(null);

  useEffect(() => {
    if (messageWrapRef.current) {
      messageWrapRef.current.scrollTop = messageWrapRef.current.scrollHeight;
    }
  }, [chat]);

  return (
    <main className="main_chat">
      {!chat ? (
        <div className="init_chat">
          <i className="fa fa-inbox"></i>
          <h4>Choose a conversation from the left</h4>
        </div>
      ) : (
        <>
          <div className="loader" style={{ opacity: 0 }}>
            <p></p>
            <h4>Loading</h4>
          </div>
          <div className="message-wrap" id="message-wrap" ref={messageWrapRef}>
            {chat.messages.map((message, index) => (
              <div className="message" key={index}>
                <img src={chat.avatar} alt={chat.username} />
                <p>{message}</p>
              </div>
            ))}
          </div>
          <footer className="footer_chat">
            <form id="chat-form" onSubmit={handleFormSubmit}>
              <input
                type="text"
                id="message-input"
                placeholder="Enter a message"
                ref={messageInputRef}
                autoComplete="off"
              />
              <input type="submit" value="Send" />
            </form>
          </footer>
        </>
      )}
    </main>
  );
};

export default ChatMessages;
