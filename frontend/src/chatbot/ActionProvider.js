class ActionProvider {
    constructor(createChatBotMessage, setStateFunc, createClientMessage) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
        this.createClientMessage = createClientMessage;
    }
    greet = () => {
        const message = this.createChatBotMessage("Hey user! Good to see you.");
        this.addMessageToState(message);
    };
    ngo = () => {
        const message = this.createChatBotMessage("Read more about the NGO on their webiste");
        this.addMessageToState(message);
    };
    volunteer = () => {
        const message = this.createChatBotMessage("Please register yourself as a volunteer first and then head over to the volunteer dashboard for more info.");
        this.addMessageToState(message);
    };
    corporate1 = () => {
        const message = this.createChatBotMessage("Please register yourself as a corporate first and then head over to the volunteer dashboard for more info.");
        this.addMessageToState(message);
    };
    corporate2 = () => {
        const message = this.createChatBotMessage("Your contributions are valuable to us.");
        this.addMessageToState(message);
    };
    socialtown = () => {
        const message = this.createChatBotMessage("The Social Town (Social Town Foundation ) is an early stage non profit start -up registered as a Section 8 company under the Ministry of Corporate Affairs. A virtual platform for community builders and social change makers where they can Iearn about each other, assist , support and exchange resources.");
        this.addMessageToState(message);
    };
    thankyou = () => {
        const message = this.createChatBotMessage("Glad to have you on board!");
        this.addMessageToState(message);
    };
    roles = () => {
        const message = this.createChatBotMessage("We intend to provide a collaborative platform which will bring all the social stakeholders under one roof.");
        this.addMessageToState(message);
    };
    homepage = () => {
        const message = this.createChatBotMessage("Connect with us here for more info.");
        this.addMessageToState(message);
    };
    default_msg = () => {
        const message = this.createChatBotMessage("I don't understand, please drop a mail at thesocialtown2021@gmail.com for more assistance.");
        this.addMessageToState(message);
    };

    addMessageToState = (message) => {
        this.setState((prevState) => ({
            ...prevState,
            messages: [...prevState.messages, message],
        }));
    };
}

export default ActionProvider;