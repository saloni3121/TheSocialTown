import React from "react";
import Chatbot from "react-chatbot-kit";
import '../styles/messenger.css'
import config from "../chatbot/config";
import ActionProvider from "../chatbot/ActionProvider";
import MessageParser from "../chatbot/MessageParser";


function Messenger() {
    return ( 
        <div className="right pop">
        <        Chatbot config = { config }
        actionProvider = { ActionProvider }
        messageParser = { MessageParser }
        />
        </div>
    );
}
export default Messenger;