import React, { useState, useEffect } from "react";
import axios from "./axios";
import Pusher from "pusher-js";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const { data } = await axios.get("/api/v1/messages/sync");
        setMessages(data);
      } catch (error) {
        console.log(error.toString());
      }
    };
    getMessages();
  }, []);

  useEffect(() => {
    const pusher = new Pusher("36b75420a6daec5ddaa9", {
      cluster: "eu",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      setMessages([...messages, newMessage]);
      console.log(newMessage)
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  return (
    // BEM convention naming
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
