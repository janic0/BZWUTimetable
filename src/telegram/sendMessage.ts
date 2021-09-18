import axios, { AxiosResponse } from "axios";
import pendingMessagesInstance from "./pendingMessages"

interface reply_markup {
	keyboard: {text: string}[][]
}


const sendMessage = (
	chat: string | number,
	text: string,
	reply_markup?: reply_markup
): Promise<AxiosResponse<any>> | undefined => {
	if (text && chat) {
		return axios
			.post(
				"https://api.telegram.org/bot" + process.env.TOKEN + "/sendMessage",
				{
					chat_id: chat,
					text,
					disable_notification: true,
					reply_markup
				}
			)
			.then((r) => {
				if (r.status === 429) {
					pendingMessagesInstance.pendingMessages.push({ chat, text });
				}
				return r;
			})
			.catch((e) => {
				return e;
			});
	}
	return undefined;
};

export default sendMessage;