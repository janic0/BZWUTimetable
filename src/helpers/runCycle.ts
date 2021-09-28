import db from "../db";
import doLogicOnChat from "./doLogicOnChat";

const runCycle = (now: Date) => {
	db.chat.findMany().then((chats) => {
		chats.forEach((chat) => {
			doLogicOnChat(chat, now, false);
		});
	});
};

export default runCycle;
