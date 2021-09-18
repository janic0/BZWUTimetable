import axios, { AxiosResponse } from "axios";

const sendSticker = (
	chat: string | number,
	sticker: string
): Promise<AxiosResponse<any>> | undefined => {
	if (sticker && chat) {
		return axios
			.post(
				"https://api.telegram.org/bot" + process.env.TOKEN + "/sendSticker",
				{
					chat_id: chat,
					sticker,
					disable_notification: true,
					reply_markup: {
						keyboard: [
							[
								{
									text: "/show",
								},
							],
						],
						resize_keyboard: true,
					},
				}
			)
			.then((r) => {
				if (r.status === 429) {
					console.log("getting rate-limited");
				}
				return r;
			})
			.catch((e) => {
				return e;
			});
	}
	return undefined;
};

export default sendSticker