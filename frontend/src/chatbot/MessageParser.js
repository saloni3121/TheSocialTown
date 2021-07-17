class MessageParser {
    constructor(actionProvider, state) {
        this.actionProvider = actionProvider;
        this.state = state;
    }

    parse(message) {
        console.log(message)
        const lowercase = message.toLowerCase();

        if (lowercase.includes("hello") || lowercase.includes("hey") || lowercase.includes("hi")) {
            this.actionProvider.greet();
        } else if (lowercase.includes("ngo")) {
            this.actionProvider.ngo();
            window.open('https://en.wikipedia.org/wiki/List_of_non-governmental_organisations_in_India', 'blank');
        } else if (lowercase.includes("volunteer")) {
            this.actionProvider.volunteer();
        } else if (lowercase.includes("corporate")) {
            this.actionProvider.corporate1();
            this.actionProvider.corporate2();
        } else if (lowercase.includes("social town")) {
            this.actionProvider.socialtown();
            window.open('https://www.thesocialtown.in/', 'blank');
        } else if (lowercase.includes("roles") || lowercase.includes("duties") || lowercase.includes("tasks") || lowercase.includes("responsibilities")) {
            this.actionProvider.roles();
        } else if (lowercase.includes("thank")) {
            this.actionProvider.thankyou();
        } else if (lowercase.includes("connect") || lowercase.includes("more") || lowercase.includes("join") || lowercase.includes("donate")) {
            this.actionProvider.homepage();
            window.open('http://localhost:3000/',
                'blank');
        } else {
            this.actionProvider.default_msg();
        }
    }
}

export default MessageParser;