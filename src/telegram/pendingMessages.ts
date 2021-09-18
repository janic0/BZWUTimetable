import sendMessage from "./sendMessage"

interface chat {
	chat: string | number;
	text: string;
}

class pendingMessagesReporter {
  pendingMessages: chat[] = []
  constructor() {
    setInterval(() => {
      this.pendingMessages.forEach((msg) => {
        sendMessage(msg.chat, msg.text);
      });
      this.pendingMessages = [];
    }, 30000);

  }
}

export default new pendingMessagesReporter


