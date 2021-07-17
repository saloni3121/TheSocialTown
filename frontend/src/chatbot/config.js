import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import Options from '../components/options/Options';

const config = {
    botName: "Notifications:",
    initialMessages: [createChatBotMessage(`Hello user! Please identify yourself as one of the stakeholders!`, {
        widget: "options",
    }), ],
    widgets: [{
        widgetName: "options",
        widgetFunc: (props) => < Options {...props }
        />,
    }, ],
};

export default config