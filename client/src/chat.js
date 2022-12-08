import React, { useEffect, useState } from "react";

const Chat = ({ socket, username, room }) => {
  const [currMessage, setCurrMessage] = useState("");
  const sendMessage = async () => {
    if (currMessage !== "") {
      const messageData = {
        room,
        author: username,
        message: currMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
    }
  };
  useEffect(() => {
	socket.on("receive_message", data => {
		console.log(data);
	})

  }, [socket])
  return (
    <div>
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-header"></div>
      <div className="chat-header">
        <input
          type="text"
          placeholder="Hey.."
          onChange={(e) => setCurrMessage(e.target.value)}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
};

export default Chat;
