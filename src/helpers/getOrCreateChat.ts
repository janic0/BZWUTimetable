import { Chat } from "@prisma/client";
import db from "../db";

const getChat = (chat: number): Promise<Chat> => {
	return new Promise((res, _) => {
		db.chat
			.findFirst({
				where: {
					chat,
				},
			})
			.then((c) => {
				if (c) {
					res(c);
				} else {
					db.chat
						.create({
							data: {
								chat: chat,
								lang: "DE",
							},
						})
						.then((r) => {
							res(r);
						});
				}
			});
	});
};


export default getChat;