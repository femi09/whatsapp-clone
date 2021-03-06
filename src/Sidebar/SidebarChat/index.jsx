import React from 'react';
import { Avatar } from "@material-ui/core";
import "./index.css";

const SidebaeChat = () => {
    return (
        <div className="sidebarChat">
            <Avatar/>
            <div className="sidebarChat__info">
                <h2>Room name</h2>
                <p>This is the last message</p>
            </div>
        </div>
    )
}

export default SidebaeChat
