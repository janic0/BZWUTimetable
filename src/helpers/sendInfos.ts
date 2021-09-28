import sendMessage from "../telegram/sendMessage";
import { Chat } from ".prisma/client";

const sendMessages = (
	chat: Chat,
	overWriteInfos: string[],
	useOverWriteArray: boolean,
	c: string,
	infos: string[]
) => {
	let master = "";
	if (
		useOverWriteArray &&
		overWriteInfos.length &&
		overWriteInfos !== ["no classes, enjoy your free-time"]
	) {
		overWriteInfos.forEach((v, idx) => {
			if (chat.classes.length > 1 && !chat.classes.includes("BMTL21a")) {
				master +=
					v +
					"[" +
					c +
					"]" +
					(idx < overWriteInfos.length - 1 ? "\n----------\n" : "");
			} else {
				master += v + (idx < overWriteInfos.length - 1 ? "\n----------\n" : "");
			}
		});
		sendMessage(chat.chat, master);
	} else {
		infos.forEach((v, idx) => {
			if (chat.classes.length > 1 && !chat.classes.includes("BMTL21a")) {
				master +=
					v + "[" + c + "]" + (idx < infos.length - 1 ? "\n----------\n" : "");
			} else {
				master += v + (idx < infos.length - 1 ? "\n----------\n" : "");
			}
		});
		sendMessage(chat.chat, master);
	}
};

export default sendMessages;
