import sendMessage from "../telegram/sendMessage";
import { Chat } from ".prisma/client";

const sendMessages = (
	chat: Chat,
	overWriteInfos: string[],
	useOverWriteArray: boolean,
	c: string,
	infos: string[],
	custom: boolean
) => {
	let master = "";
	if (useOverWriteArray && overWriteInfos.length) {
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
		if (infos.length) {
			infos.forEach((v, idx) => {
				if (chat.classes.length > 1 && !chat.classes.includes("BMTL21a")) {
					master +=
						v +
						"[" +
						c +
						"]" +
						(idx < infos.length - 1 ? "\n----------\n" : "");
				} else {
					master += v + (idx < infos.length - 1 ? "\n----------\n" : "");
				}
			});
			sendMessage(chat.chat, master);
		} else if (custom) {
			sendMessage(chat.chat, "no lessons, enjoy your free time");
		}
	}
};

export default sendMessages;
